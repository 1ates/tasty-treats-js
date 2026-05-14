## İş için hazırlanma

1. Bilgisayarınızda Node.js'nin LTS sürümünün yüklü olduğundan emin olun.
   Gerekirse [Download and install](https://nodejs.org/en/).
2. Projenin temel bağımlılıklarını terminalde `npm install` komutu ile yükleyin.
3. Terminalde `npm run dev` komutunu çalıştırarak geliştirme modunu başlatın.
4. Tarayıcınızda [http://localhost:5173](http://localhost:5173) adresine gidin.
   Proje dosyalarındaki değişiklikleri kaydettikten sonra bu sayfa otomatik
   olarak yeniden yüklenecektir.

## Dosyalar ve klasörler

- Sayfa bileşeni biçimlendirme dosyaları `src/partials` klasöründe bulunmakta ve
  `index.html` dosyasına aktarılmaktadır. Örneğin, başlık biçimlendirme dosyası
  `header.html` `partials` klasöründe oluşturulur ve `index.html` dosyasına
  aktarılır.
- Stil dosyaları `src/css` klasöründe bulunmakta ve sayfaların HTML dosyalarına
  aktarılmaktadır. Örneğin, `index.html` için stil dosyası `index.css` olarak
  adlandırılır.
- Görüntüler `src/img` klasörüne eklenmektedir. Oluşturucu yalnızca projenin
  üretim sürümü dağıtıldığında bunları optimize eder. Tüm bunlar bulutta
  gerçekleşir, böylece bilgisayarınıza yük olmaz, çünkü zayıf makinelerde uzun
  zaman alabilir.

## Nasıl çalışır

![How it works](./assets/how-it-works.png)

1. GitHub deposuna yapılan her `main` gönderim sonrasında
   `.github/workflows/deploy.yml` dosyasında özel bir komut dosyası (GitHub
   Action) çalıştırılır.
2. Depo dosyalarının tümü sunucuya kopyalanır, burada proje başlatılır ve
   dağıtımdan önce kod kalitesi kontrolü ve derleme yapılır.
3. Eğer tüm adımlar başarılı bir şekilde tamamlanırsa, proje dosyalarının
   üretime hazır sürümü `gh-pages` dalına gönderilir. Aksi takdirde, komut
   dosyası çalıştırma günlüğünde sorunun ne olduğu belirtilir.
