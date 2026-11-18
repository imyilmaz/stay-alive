# failsurvive.com — yayın hazırlığı

18 Kasım 2026. Bu dosya kurum içi yayın notudur; `dist/` paketine alınmaz.

## Hazırlananlar

- Türkçe tanıtım sitesi, yerel font/görseller, bağlantısız mağaza kartları.
- Güncellenmiş Gizlilik Politikası ve ayrı KVKK aydınlatması; footer’da iki ayrı modal.
- `privacy.html` ve `kvkk.html`: mağaza/oyun için doğrudan açılabilen kalıcı sayfalar. Modal tek başına Play Console URL gereğini karşılamaz; bu sayfalar korunur.
- `node scripts/prepare-release.mjs --origin https://failsurvive.com`: yalnız statik dosyaları `dist/` içine kopyalar, canonical/OG bilgileri, robots.txt, sitemap.xml ve IIS/Plesk güvenlik başlıkları oluşturur. Sunucuya bağlanmaz veya yayın yapmaz.
- Mağaza bağlantıları hazır olunca `site.config.js` düzenlenip paket yeniden hazırlanır.

## Yayın öncesinde hâlâ doğrulanacak gerçek ortam işleri

- [Tamamlandı — 18 Kasım 2026] failsurvive.com Plesk’e eklendi; belge kökü failsurvive.com. Yetkili DNS A kaydı 89.252.187.226, www CNAME failsurvive.com. Ücretsiz Let’s Encrypt kök+www sertifikası ve otomatik yenileme etkin. HTTP→HTTPS ve www→ana alan adı 301 ile doğrulandı; HTTPS 200 ve TLS doğrulama sonucu 0. Bazı ağlarda eski DNS önbelleği bir süre devam edebilir.
- Plesk/IIS için yalnız dist/ içeriği failsurvive.com belge köküne yüklenir. Paket mevcut Plesk web.config dosyasını içermez ve onu ezmez. Güvenlik başlıkları deployment/security-headers.web.config.example içinde ayrı bir birleştirme örneğidir; bu dosya siteye yüklenmez. Başlıklar mevcut Plesk web.config ayarları korunarak ayrıca birleştirilmeli ve gerçek yanıtta doğrulanmalı. .git, kaynak notları, parolalar ve oyun sunucusu dosyaları yüklenmez.
- VPS/Nginx seçilirse IIS `web.config` uygulanmaz. Aynı CSP/nosniff/frame/referrer/permissions başlıkları Nginx’te tanımlanır; dizin listeleme kapatılır. HSTS yalnız HTTPS ve yönlendirme doğrulandıktan sonra etkinleştirilir.
- Web/CDN/VPS erişim loglarının gerçek veri alanları, saklama süresi, erişim yetkileri, imhası ve yedek döngüsü belirlenip test edilir. Politikaya uygulanmamış sabit bir süre yazılmadı. Destek e-postaları için de silme/yanıtlama sorumluluğu uygulanmalı.
- Google/AdMob, RevenueCat ve Gmail’in yurt dışı veri akışlarında KVKK m.9 dayanağı, veri işleme sözleşmeleri ve gerekiyorsa standart sözleşme/bildirim usulü sağlayıcı bazında doğrulanır. İmzalanmış belge veya sağlanmış yeterlilik varmış gibi beyan yapılmadı. KVKK hukuk uzmanıyla bu gerçek sözleşmeler üzerinden son kontrol gerekir.
- Mobil oyundaki reklam izinleri ayrıca kontrol edilir: UMP `canRequestAds` ve TFUA/kişiselleştirilmemiş reklam ayarları Türkiye’de KVKK açık rızasının yerine geçmiş sayılmaz. Başka hukuki sebebi olmayan isteğe bağlı veri akışları rızadan önce başlamamalı. Web sayfasındaki aydınlatma uygulamadaki gerekli ilk bilgilendirmeyi/rızayı tek başına sağlamaz.
- Mevcut metin CDN/cihaz içi kayıt sürümü içindir. API, cihaz aktarımı, bulut kayıt veya olay analizi açılmadan önce veri kategorileri, hukuki sebepler, alıcılar, saklama, hesap/veri silme uçları ve Play Data Safety beyanı güncellenir. Üretim derlemesinin ortam değişkenleri test sürümünden farklı olabilir; gerçek ağ trafiğiyle doğrulama gerekir.
- Site doğrudan analiz/reklam çerezi koymuyor; gerçek hosting de gereksiz takip eklemiyorsa çerez rıza banner’ı gerekmiyor. Sonradan takip eklenirse yeniden değerlendirilir.
- Yayın adresinde ana sayfa/404, gizlilik/KVKK, font ve resimler, mobil menü, accordion, modal kapatma/klavye odağı ve uygulama/mağaza bağlantıları son kez kontrol edilir. Eski Vercel gizlilik sayfası, uygulama ve mağaza bağlantıları yeni adrese geçirildikten sonra ele alınır.

## Yayın sonrasına bırakılan talep — canlı bölüm adları

Oyunun yayınıyla birlikte/sonrasında web takvimine **canlı günlük bölüm adları** getirilecek. Bu aşamada uygulanmadı.

- Başlıklar gerçek yayımlanmış bölüm manifesti veya salt okunur genel API’den alınacak; sahte/önden üretilmiş başlık gösterilmeyecek.
- Türkiye günü, yayımlanma durumu, önbellek ve servis hatası davranışı dikkate alınacak; gelecek gün içerikleri erken açığa çıkmayacak.
- Oyuncu kimliği/kaydı bu amaçla gönderilmeyecek. Gerekirse yalnız içerik adresine CORS/CSP izni eklenecek.

## İnceleme dayanakları

- [KVKK aydınlatma yükümlülüğü](https://www.kvkk.gov.tr/Icerik/6765/AYDINLATMA-YUKUMLULUGUNUN-YERINE-GETIRILMESI-HAKKINDA-KAMUOYU-DUYURUSU)
- [Aydınlatma/açık rıza ayrımı, 2026/347](https://www.kvkk.gov.tr/Icerik/8710/veri-sorumlulari-tarafindan-acik-riza-ve-aydinlatma-metinlerinin-ayri-ayri-duzenlenmesi-gerektigi-hakkinda-kisisel-verileri-koruma-kurulunun-18-02-2026-tarihli-ve-2026-347-sayili-ilke-kararina-iliskin-kamuoyu-duyurusu)
- [Yurt dışı aktarım](https://www.kvkk.gov.tr/Icerik/2053/Yurtdisina-Aktarim)
- [Başvuru yanıtları, 30 gün](https://www.kvkk.gov.tr/Icerik/9024/ilgili-kisilerin-basvurularina-verilecek-cevabin-bildirim-usulune-iliskin-kamuoyu-duyurusu)
- [Silme/yok etme yönetmeliği](https://www.kvkk.gov.tr/Icerik/5441/KISISEL-VERILERIN-SILINMESI-YOK-EDILMESI-VEYA-ANONIM-HALE-GETIRILMESI-HAKKINDA-YONETMELIK)
- [Google Play kullanıcı verisi politikası](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en)
- [AdMob SDK veri açıklamaları](https://developers.google.com/admob/android/privacy/play-data-disclosure?hl=en)
- [RevenueCat müşteri kimlikleri](https://www.revenuecat.com/docs/customers/user-ids)

## Tamamlanan yerel kontroller

- Chrome: 320, 390, 768, 841, 1024, 1440px; tum sayfada yatay tasma ve kirpilan paragraf/buton metni bulunmadi.
- 390px KVKK modali: 358px genislik, metin kaydirma ve kapatma; Gizlilik modali ac/kapat dogrulandi.
- JavaScript sozdizimi, HTML kimlikleri/dosya referanslari, canonical, sitemap XML ve IIS web.config XML kontrolu gecti. Bunlar gercek hostingde HTTPS/baslik/riza islemlerinin dogrulanmasinin yerine gecmez.

## Son durum — main, DNS ve SSL

Site main dalına birleştirildi ve GitHub’a gönderildi. DNS/SSL işlemleri kullanıcı talimatıyla tamamlandı; Let’s Encrypt koşulları için ayrıca açık onay alındı. Sertifika panelinde son geçerlilik 16 Şubat 2027 ve otomatik yenileme etkin göründü. Kontroller sertifika denetimi kapatılmadan, DNS önbelleğini dışlamak için hosting IP’sine --resolve ile bağlanılarak yapıldı. Kullanıcı site dosyalarını kendisi yükleyecek; bu işlemde tanıtım dosyaları yüklenmedi.
