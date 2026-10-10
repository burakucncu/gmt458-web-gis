# Git Commit Planı

Ödev için farklı günlerde en az üç gerçek commit oluşturmalısın. Aşağıdaki dosyalar ZIP içinde hazır olsa da hepsini tek seferde commit etme. Günleri geriye dönük değiştirme.

## 8 Ekim 2026, Perşembe — Ana sayfa

```bash
git init
git branch -M main
git add index.html style.css i18n.js
git commit -m "Create homepage and language selector"
```

Ana sayfa, mevcut tasarım, responsive CSS ve EN/TR dil seçimi.

## 9 Ekim 2026, Cuma — Projeler

```bash
git add projects.html images/
git commit -m "Add GitHub projects and image table"
```

GNSS NMEA Parser, Nimbus-Edge, Aegis, Sat-Track kartları ve görselli tablo.

## 10 Ekim 2026, Cumartesi — Haritalar

```bash
git add maps.html leaflet.js openlayers.js README.md COMMIT_PLANI.md
git commit -m "Add Leaflet and OpenLayers maps"
```

Zoom 7 işaretçi eşiği ve dünyanın yatayda tekrarını engelleyen ayarlar.

## 11 Ekim 2026, Pazar — Kontrol ve yayın

```bash
python3 -m http.server 8000
```

- Tüm sayfalar ve bağlantılar açılıyor mu?
- EN/TR seçimi bütün sayfalarda korunuyor mu?
- Her iki haritada zoom 7 altı/üstü davranışı doğru mu?
- Haritalar yatay kaydırıldığında dünya tekrar ediyor mu?
- README dosyasında AI kullanım süresi için **gerçek tahmin** yazıldı mı?

Gerektiğinde ek bir commit atabilirsin. Git geçmişi:

```bash
git log --date=short --pretty=format:"%h  %ad  %s"
```

GitHub'da boş bir repository oluşturup gerçek depo adresini kullan:

```bash
git remote add origin https://github.com/burakucncu/REPOSITORY_NAME.git
git push -u origin main
```

Yayın için GitHub deposunda **Settings → Pages → Deploy from a branch → main / (root)** seç.
