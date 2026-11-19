import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// The homepage dialogs are the single source of truth for legal copy.
export async function syncLegalPages() {
  const source = await readFile(path.join(root, 'index.html'), 'utf8');
  for (const [key, title, label, other, otherTitle] of [
    ['privacy', 'Gizlilik Politikası', 'GİZLİLİK', 'kvkk', 'KVKK Aydınlatma Metni'],
    ['kvkk', 'KVKK Aydınlatma Metni', 'KVKK', 'privacy', 'Gizlilik Politikası'],
  ]) {
    const dialog = source.match(new RegExp(`<dialog[^>]*data-legal-modal="${key}"[^>]*>([\\s\\S]*?)<\\/dialog>`))?.[1];
    const content = dialog?.match(/<div class="privacy-content">([\s\S]*?)<\/div>\s*$/)?.[1];
    if (!content) throw new Error(`Missing legal dialog: ${key}`);
    const article = content.trim().replace(/<h2\b/, '<h1').replace('</h2>', '</h1>').replaceAll('<h3', '<h2').replaceAll('</h3>', '</h2>');
    const html = `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#10110f">
  <title>Hayatta Kal — ${title}</title>
  <meta name="description" content="Hayatta Kal ${title}. Veri kullanımı, hizmet sağlayıcıları ve kişisel veri başvuruları hakkında bilgi.">
  <link rel="icon" href="favicon.png" type="image/png">
  <link rel="stylesheet" href="assets/fonts/fonts.css">
  <link rel="stylesheet" href="styles.css">
  <style>
    .legal-page{background:radial-gradient(ellipse at 0 0,#e65b480b,transparent 45%),var(--bg)}
    .legal-header{max-width:1504px;margin:auto;padding:30px var(--gutter);display:flex;align-items:center;justify-content:space-between;gap:24px;border-bottom:1px solid var(--line)}
    .legal-header .brand{min-width:0}.legal-header .brand>span{font-size:25px}.legal-header .brand small{font-size:10px}
    .legal-back{display:flex;align-items:center;gap:12px;min-height:44px;font-family:var(--mono);font-size:12px;color:var(--muted);white-space:nowrap;transition:color .2s}
    .legal-back:hover{color:var(--red)}.legal-back span{font-size:22px;color:var(--red)}
    .legal-layout{max-width:1504px;margin:auto;padding:70px var(--gutter) 90px;display:grid;grid-template-columns:minmax(180px,.65fr) minmax(0,1.6fr);gap:clamp(40px,7vw,110px)}
    .legal-aside{position:sticky;top:40px;align-self:start}.legal-aside>.eyebrow{color:var(--red)}
    .legal-aside strong{display:block;margin:22px 0;font:700 clamp(40px,4.5vw,68px)/.95 var(--display);text-transform:uppercase;letter-spacing:-.01em}.legal-aside strong span{color:var(--muted)}
    .legal-nav{display:flex;flex-direction:column;margin-top:36px;border-top:1px solid var(--line)}.legal-nav a{padding:14px 0;border-bottom:1px solid var(--line);font-size:13px;color:var(--muted);transition:color .2s}.legal-nav a:hover,.legal-nav a[aria-current="page"]{color:var(--ink)}.legal-nav a[aria-current="page"]::before{content:'↗';color:var(--red);margin-right:10px}
    .legal-content{min-width:0}.legal-content h1{font:700 clamp(48px,6.2vw,88px)/1 var(--display);letter-spacing:-.025em;margin-bottom:22px;overflow-wrap:anywhere}
    .legal-content h2{font:600 clamp(23px,2.3vw,30px)/1.25 var(--display);margin:42px 0 16px;padding-top:26px;border-top:1px solid var(--line);color:var(--ink)}
    .legal-content p,.legal-content ul{font-size:15px;line-height:1.95;color:#b6baab}.legal-content p+p{margin-top:18px}.legal-content .date{font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:30px}.legal-content strong{color:var(--ink);font-weight:600}.legal-content ul{padding-left:22px}.legal-content li+li{margin-top:14px}.legal-content a{color:var(--red);overflow-wrap:anywhere;text-decoration:underline;text-underline-offset:4px}.legal-content a:hover{color:#f38b7c}
    .legal-footer{max-width:1504px;margin:auto;padding:28px var(--gutter);border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;gap:20px;color:var(--muted);font-family:var(--mono);font-size:12px}.legal-footer a{transition:color .2s}.legal-footer a:hover{color:var(--red)}
    @media(max-width:840px){.legal-layout{grid-template-columns:1fr;padding-top:40px;gap:38px}.legal-aside{position:static}.legal-aside strong{font-size:42px;margin:16px 0}.legal-aside strong br{display:none}.legal-nav{flex-direction:row;gap:24px;margin-top:24px}.legal-nav a{border:0}.legal-header .brand small{display:none}}
    @media(max-width:480px){.legal-header{padding-block:20px;gap:14px}.legal-header .brand{gap:8px}.legal-header .brand>span{font-size:20px}.legal-header .brand-heart{width:23px;height:23px}.legal-back{font-size:11px;gap:6px}.legal-layout{padding-bottom:54px}.legal-nav{gap:18px;flex-wrap:wrap}.legal-nav a{padding:12px 0}.legal-content p,.legal-content ul{font-size:14px}.legal-footer{flex-wrap:wrap;font-size:11px}}
    @media(prefers-reduced-motion:reduce){.legal-page a{transition:none}}
  </style>
</head>
<body class="legal-page">
  <a class="skip-link" href="#icerik">İçeriğe geç</a>
  <header class="legal-header">
    <a class="brand" href="./" aria-label="Hayatta Kal ana sayfa"><svg class="brand-heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg><span>HAYATTA KAL<small>HER KARARIN BİR BEDELİ VAR.</small></span></a>
    <a class="legal-back" href="./"><span aria-hidden="true">←</span> ANA SAYFA</a>
  </header>
  <main class="legal-layout">
    <aside class="legal-aside" aria-label="Bilgilendirme sayfaları">
      <p class="eyebrow">HAYATTA KAL / ${label}</p>
      <strong>Açık ve<br> <span>anlaşılır.</span></strong>
      <nav class="legal-nav" aria-label="Yasal bilgiler"><a href="${key}.html" aria-current="page">${title}</a><a href="${other}.html">${otherTitle}</a></nav>
    </aside>
    <article class="legal-content" id="icerik" aria-labelledby="${key}-title">
      ${article}
    </article>
  </main>
  <footer class="legal-footer"><span>HAYATTA KAL · HER KARARIN BİR BEDELİ VAR.</span><a href="https://github.com/imyilmaz" target="_blank" rel="noopener noreferrer">Brahim ↗</a></footer>
</body>
</html>
`;
    await writeFile(path.join(root, `${key}.html`), html);
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await syncLegalPages();
