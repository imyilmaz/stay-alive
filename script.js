(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Yeni mağaza adresi tanımlandığında sadece ilgili kart normal bağlantı olur.
  const storeHosts = { googlePlay: ['play.google.com'], appStore: ['apps.apple.com', 'itunes.apple.com'] };
  $$('.store-card[data-store]').forEach(button => {
    const value = window.SITE_CONFIG?.downloadLinks?.[button.dataset.store];
    if (!value || typeof value !== 'string') return;
    let url;
    try { url = new URL(value); } catch { return; }
    if (url.protocol !== 'https:' || !storeHosts[button.dataset.store]?.includes(url.hostname)) return;
    const link = document.createElement('a');
    link.className = button.className + ' is-live';
    link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', button.dataset.store === 'googlePlay' ? 'Google Play üzerinden indir' : 'App Store üzerinden indir');
    link.replaceChildren(...button.childNodes);
    button.replaceWith(link);
  });

  const header = $('.site-header'), menu = $('.menu-toggle');
  const drawer = $('#mobile-menu'), panel = $('.drawer-panel');
  let menuOpen = false, closeTimer;
  const closeMenu = (restoreFocus = false) => {
    if (!menuOpen) return;
    menuOpen = false;
    drawer.classList.remove('is-open'); drawer.inert = true;
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Menüyü aç');
    if (restoreFocus) menu.focus();
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => document.body.classList.remove('drawer-active'), reducedMotion.matches ? 0 : 650);
  };
  const openMenu = () => {
    clearTimeout(closeTimer); menuOpen = true; drawer.inert = false;
    document.body.classList.add('drawer-active'); drawer.classList.add('is-open');
    menu.setAttribute('aria-expanded', 'true'); menu.setAttribute('aria-label', 'Menüyü kapat');
    $('.drawer-close').focus({ preventScroll: true });
  };
  menu.addEventListener('click', () => menuOpen ? closeMenu(true) : openMenu());
  $('.drawer-close').addEventListener('click', () => closeMenu(true));
  $('.drawer-backdrop').addEventListener('click', () => closeMenu(true));
  $$('.drawer-panel a').forEach(link => link.addEventListener('click', () => closeMenu(true)));
  document.addEventListener('keydown', event => {
    if (!menuOpen) return;
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); }
    if (event.key === 'Tab') {
      const stops = [...panel.querySelectorAll('a,button')];
      const first = stops[0], last = stops[stops.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  // Native details klavye davranisini koruyan, tek acik yanitli slide animasyonu.
  const faqItems = $$('.faq-list details');
  const faqStates = new Map();
  const slideFaq = (item, open) => {
    const summary = item.querySelector('summary');
    const current = item.getBoundingClientRect().height;
    const previous = faqStates.get(item);
    if (previous?.animation) previous.animation.cancel();
    const state = { open, animation: null }; faqStates.set(item, state);
    summary.setAttribute('aria-expanded', String(open));
    if (reducedMotion.matches || !item.animate) { item.open = open; item.style.height = ''; return; }
    item.style.height = ''; item.open = true;
    const target = open ? item.getBoundingClientRect().height : summary.getBoundingClientRect().height + parseFloat(getComputedStyle(item).borderTopWidth) + parseFloat(getComputedStyle(item).borderBottomWidth);
    item.style.overflow = 'hidden';
    state.animation = item.animate([{ height: current + 'px' }, { height: target + 'px' }], { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
    state.animation.onfinish = () => {
      if (faqStates.get(item) !== state) return;
      item.open = open; item.style.height = ''; item.style.overflow = ''; state.animation = null;
    };
  };
  faqItems.forEach(item => {
    const summary = item.querySelector('summary'); summary.setAttribute('aria-expanded', String(item.open));
    summary.addEventListener('click', event => {
      event.preventDefault();
      const open = !(faqStates.get(item)?.open ?? item.open);
      if (open) faqItems.forEach(other => { if (other !== item && (faqStates.get(other)?.open ?? other.open)) slideFaq(other, false); });
      slideFaq(item, open);
    });
  });

  const privacyModal = $('.privacy-modal');
  $('.privacy-trigger').addEventListener('click', () => {
    privacyModal.showModal(); document.body.classList.add('privacy-active');
    $('.privacy-content').scrollTop = 0;
  });
  $('.privacy-close').addEventListener('click', () => privacyModal.close());
  privacyModal.addEventListener('close', () => document.body.classList.remove('privacy-active'));
  privacyModal.addEventListener('click', event => {
    const rect = privacyModal.getBoundingClientRect();
    if (event.target === privacyModal && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) privacyModal.close();
  });

  const icons = { man: 'heart', woman: 'eye', traitor: 'fang', criminal: 'hood', soldier: 'shield', hunter: 'target', shaman: 'flask', child: 'spark', elder: 'compass', ghost: 'ghost', titan: 'titan', shadow: 'moon', ranger: 'route', medic: 'plus', oracle: 'orb' };
  const immunities = { vampire_kill: 'Vampir türündeki ölüm olaylarına bağışıklık', fall_damage: 'Düşme türündeki ölüm olaylarına bağışıklık', trap_kill: 'Tuzak türündeki ölüm olaylarına bağışıklık', animal_kill: 'Vahşi hayvan türündeki ölüm olaylarına bağışıklık', poison_kill: 'Zehir türündeki ölüm olaylarına bağışıklık' };
  const ability = passive => {
    switch (passive.type) {
      case 'hp_bonus': return `+${passive.hpBonus} başlangıç canı`;
      case 'chance_bonus': return `Şans atışlarında +${Math.round(passive.chanceBonus * 100)} yüzde puanı`;
      case 'immunity': return immunities[passive.immuneTo] || 'Belirli ölüm türüne karşı koruma';
      case 'extra_choice': return `${passive.extraChoices} ekstra seçenek görme`;
      case 'energy_save': return `Adım enerjisinde %${Math.round(passive.energySavePct * 100)} tasarruf`;
      case 'risk_reward': return `+%${Math.round((passive.hpMultiplier - 1) * 100)} can · +%${Math.round((passive.damageMult - 1) * 100)} alınan hasar`;
      default: return 'Kendine özgü hayatta kalma biçimi';
    }
  };
  const characters = window.GAME_CHARACTERS || [];
  const grid = $('#character-grid'), profile = $('.character-profile');
  const buttons = [];
  const selectCharacter = id => {
    const index = characters.findIndex(character => character.id === id);
    if (index < 0) return;
    const character = characters[index];
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.character === id)));
    $('#character-name').textContent = character.name;
    $('#character-description').textContent = character.desc;
    $('#character-ability').textContent = ability(character.passive);
    $('#character-number').textContent = `DOSYA / ${String(index + 1).padStart(2, '0')}`;
    $('#character-unlock').textContent = character.isPremium ? 'ÖZEL KARAKTER' : character.unlockLevel ? `SEVİYE ${character.unlockLevel}` : 'BAŞLANGIÇTA AÇIK';
    $('#character-symbol use').setAttribute('href', '#i-' + icons[id]);
    profile.dataset.kind = character.isPremium ? 'premium' : 'standard';
    if (!reducedMotion.matches && profile.animate) profile.animate([{ opacity: .6 }, { opacity: 1 }], { duration: 250 });
  };
  characters.forEach(character => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'character-tile';
    button.dataset.character = character.id;
    button.dataset.kind = character.isPremium ? 'premium' : character.unlockLevel ? 'level' : 'start';
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-label', `${character.name}: ${ability(character.passive)}`);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#i-' + icons[character.id]); svg.append(use);
    const name = document.createElement('span'); name.textContent = character.name;
    button.append(svg, name); button.addEventListener('click', () => selectCharacter(character.id));
    buttons.push(button); grid.append(button);
  });
  if (characters.length) selectCharacter(characters[0].id);
  $$('.character-filters button').forEach(filter => filter.addEventListener('click', () => {
    $$('.character-filters button').forEach(button => {
      const active = button === filter; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
    });
    buttons.forEach(button => { button.hidden = filter.dataset.filter !== 'all' && button.dataset.kind !== filter.dataset.filter; });
    const selected = buttons.find(button => !button.hidden && button.getAttribute('aria-pressed') === 'true');
    if (!selected) selectCharacter(buttons.find(button => !button.hidden)?.dataset.character);
  }));
  grid.addEventListener('keydown', event => {
    const visible = buttons.filter(button => !button.hidden);
    const index = visible.indexOf(document.activeElement);
    if (index < 0) return;
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % visible.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + visible.length) % visible.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = visible.length - 1;
    if (next !== undefined) { event.preventDefault(); visible[next].focus(); selectCharacter(visible[next].dataset.character); }
  });

  let risk = 2, paused = false;
  const riskStatuses = ['ŞİMDİLİK SAKİN.', 'SESİ DUYDUN MU?', 'TEHLİKE BÜYÜYOR.', 'KARAR ZAMANI.', 'KRİTİK TEHDİT.'];
  const riskMessages = ['Her şey sessiz. Bu, güvende olduğun anlamına gelmez.', 'Tehlike yaklaşıyor. Hareketsiz kalmak riski artırır.', 'Daha fazla enerji harcıyor, daha az şansa güveniyorsun.', 'Bir sonraki bekleyiş sonuncusu olabilir.', 'Kritik seviyede beklemek oyunda ölümle sonuçlanabilir.'];
  const renderRisk = () => {
    $('#risk-value').textContent = String(risk).padStart(2, '0');
    $('#risk-status').textContent = paused ? 'SÜRE DURDU.' : riskStatuses[risk - 1];
    $('#risk-message').textContent = paused ? 'Envanter açık. Risk yükselmiyor; kapatınca kaldığı yerden devam eder.' : riskMessages[risk - 1];
    $('.risk-lab').style.setProperty('--risk-color', paused ? '#a9b5c7' : risk < 3 ? '#bdc69e' : risk < 4 ? '#dab46e' : '#e65b48');
    $$('.risk-segments i').forEach((segment, index) => segment.classList.toggle('on', index < risk));
    $('#risk-wait').disabled = paused || risk === 5;
    $('#risk-advance').disabled = paused || risk === 1;
    $('#inventory-toggle').setAttribute('aria-pressed', String(paused));
    $('#inventory-toggle').firstChild.textContent = paused ? 'ENVANTERİ KAPAT ' : 'ENVANTERİ AÇ ';
  };
  $('#risk-wait').addEventListener('click', () => { if (!paused) risk = Math.min(5, risk + 1); renderRisk(); });
  $('#risk-advance').addEventListener('click', () => { if (!paused) risk = Math.max(1, risk - 1); renderRisk(); });
  $('#inventory-toggle').addEventListener('click', () => { paused = !paused; renderRisk(); });
  renderRisk();

  const calendar = $('#calendar-preview');
  for (let index = 0; index < 6; index++) { const cell = document.createElement('span'); cell.className = 'calendar-day empty'; calendar.append(cell); }
  for (let day = 1; day <= 30; day++) {
    const cell = document.createElement('span');
    cell.className = 'calendar-day' + (day === 18 ? ' selected' : day > 18 ? ' future' : '');
    cell.append(String(day));
    if (day <= 18) { const mark = document.createElement('i'); mark.className = 'day-mark'; cell.append(mark); }
    calendar.append(cell);
  }
  $('#copyright-year').textContent = String(new Date().getFullYear());

  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    document.body.classList.add('has-js');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08, rootMargin: '0px 0px -25px 0px' });
    $$('.reveal').forEach(element => observer.observe(element));
  }
  let scrollPending = false;
  const updateProgress = () => {
    const maximum = document.documentElement.scrollHeight - window.innerHeight;
    $('.scroll-progress').style.transform = `scaleX(${maximum > 0 ? Math.min(1, window.scrollY / maximum) : 0})`;
    scrollPending = false;
  };
  window.addEventListener('scroll', () => { if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateProgress); } }, { passive: true });
  window.addEventListener('resize', () => { if (window.innerWidth > 840) closeMenu(); updateProgress(); });
  updateProgress();
  if (window.matchMedia('(pointer: fine)').matches) {
    $('.hero').addEventListener('pointermove', event => {
      if (reducedMotion.matches) return;
      const rect = $('.hero').getBoundingClientRect();
      $('.hero-art').style.setProperty('--art-x', `${(event.clientX / rect.width - .5) * 10}px`);
      $('.hero-art').style.setProperty('--art-y', `${((event.clientY - rect.top) / rect.height - .5) * 8}px`);
    }, { passive: true });
    $('.hero').addEventListener('pointerleave', () => { $('.hero-art').style.setProperty('--art-x', '0px'); $('.hero-art').style.setProperty('--art-y', '0px'); });
  }
})();
