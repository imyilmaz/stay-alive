# Hayatta Kal — resmî tanıtım sitesi

Türkçe, mobil uyumlu ve derlemesiz HTML/CSS/JavaScript sitesi. VPS/Nginx gibi bir statik sunucuya doğrudan taşınabilir. Bu klasör oyun API'sini veya gerçek ödeme işlemini barındırmaz.

## Yerel önizleme

```sh
python3 -m http.server 4327 --bind 127.0.0.1
```

http://localhost:4327 adresini açın. Node.js/npm kurulumu gerekmez.

## Mağaza bağlantıları

`site.config.js` içindeki `downloadLinks.googlePlay` ve `downloadLinks.appStore` şimdilik `null`. Kartlar bağlantı değildir; tıklama indirme/navigasyon başlatmaz. Hover/klavye odağında “Yakında yayında” yüzüne dönerler.

Gerçek HTTPS mağaza adresini ilgili alana yazınca o kart otomatik normal bağlantıya dönüşür; dönme efekti ve yakında yüzü kaldırılır. Kabul edilen mağazalar play.google.com ve apps.apple.com/itunes.apple.com. Hazır olmayan mağazayı null bırakın; ücret/sürüm gibi sabit satış iddiası eklenmedi.

## İçerik ve görseller

- `characters.js`: oyun projesinin `src/data/characters.ts` dosyasından alınan 15 karakter ve gerçek pasif özellikler. Oyun kadrosu değişince bu veri de güncellenmeli.
- Takvim dekoratif Kasım 2026 örneğidir. Risk paneli açıklayıcı bir etkileşimdir, oynanabilir oyun veya gerçek canlı oyuncu kaydı değildir.
- Yayımlanan aynı tarihli hikâye sabittir. Yeni denemelerin seçenek sırası/görünürlüğü ve şans sonuçları değişebilir. Akış, numaraları sırayla gezmek zorunda değildir. Sahnelerin risk düşüşü değişebilir.
- Önceki demo `splash.jpg`, `well_done2.jpg` ve `favicon.png` dosyaları korunmuştur. Yeni sahte oyun ekran görüntüsü, yorum, oyuncu sayısı veya mağaza puanı kullanılmadı.
- Fontlar yerel servis edilir: Google Fonts Barlow Condensed ve Manrope, lisans metinleri `assets/fonts/*-OFL.txt` içinde. Dış font/CDN isteği ve takip kodu yoktur.
- Animasyonlar CSS 3D, IntersectionObserver ve yerel tarayıcı API'leriyle çalışır. Hareket azaltma tercihi desteklenir. Karakterler filtrelenebilir; mobil menü ve klavye gezinmesi vardır.

## Domain ve VPS aşamasında

1. Alan adı alındığında DNS/HTTPS ve gerçek canonical/og:url adresleri ayarlanır.
2. Play/App Store geliştirici sitesi ve oyun içindeki gizlilik URL'si bu alan adıyla eşleştirilir. `privacy.html` ve `app-ads.txt` kökte kalmalı.
3. `privacy.html` mevcut oyun politikasının kopyasıdır. Sunucu/hesap/bulut devreye girince gerçek veri akışına göre güncellenmeli. Yeni bir web sitesi barındırma sağlayıcısının erişim kayıtları da değerlendirilmeli.
4. Oyun API'si, kullanıcı kimliği ve meşale defteri ayrı güvenli servisler olarak kurulacak. Sitede hiçbir VPS adresi, parola, gizli anahtar veya hesap belgesi bulunmaz.

Çalışma kararı: tanıtım sitesi önce hazırlanır; VPS kurulumu/domain yayını sonraki aşamadır. Mevcut oyun deposu değiştirilmedi. Bu çalışma yeni bir kamuya açık yayın yapmaz.

## Doğrulanan teknik altyapı ve iletişim

- Mobil: `hayatta-kal/package.json` ve `App.tsx` React Native + Expo kullanıyor. Bu depoda .NET MAUI `.csproj`/`.sln` projesi yok.
- Oyun durumu: `src/store/gameStore.ts` Zustand; `src/core/contentFetcher.ts` AsyncStorage.
- Sunucu: `server/package.json` Node.js/Express/Prisma; `server/Dockerfile` Docker. Sunucu yapılandırmasının bulunması canlıya alındığı anlamına gelmez.
- Günlük içerik: `scripts/generate-daily.ts` Gemini API ve campaign doğrulayıcısını kullanıyor.
- Satın alma/reklam: react-native-purchases (RevenueCat), react-native-google-mobile-ads.
- Footer üzerindeki yaratıcı/iletişim bölümü İbrahim Mesut Yılmaz’ı ve üretimdeki rollerini tanıtır; destek adresi survive.support@gmail.com.
- Gizlilik düğmesi, mevcut `privacy.html` metninin aynı sayfadaki kopyasını native dialog içinde açar. Vercel’e yönlendirme yoktur. Politika güncellenirken hem bağımsız dosya hem modal metni birlikte güncellenmeli. Bu çalışma Vercel’deki mevcut oyun/gizlilik yayınına müdahale etmez.

## Güncel yayın hazırlığı

`YAYIN_ONCESI.md` gerçek ortam kontrollerini ve yayın sonrası canlı takvim başlıkları talebini içerir. `node scripts/prepare-release.mjs --origin https://failsurvive.com` statik yayın paketini üretir. Gizlilik ve KVKK footer’da ayrı modal olarak açılır; aynı metinlerin doğrudan sayfaları mağaza bağlantıları için korunur. Eski metin ve KVKK yalnızca metinle tam uyum garantisi vermez; servis sözleşmeleri, rıza ve saklama uygulamaları ayrıca doğrulanmalıdır.
