const foodPlaces = [
  {
    name: 'Trilye Restaurant', lat: 39.894069, lon: 32.871978,
    address: 'Kazım Özalp, Kuleli Sokak No:32, Çankaya',
    category: { en: 'Seafood', tr: 'Deniz ürünleri' }
  },
  {
    name: 'Fige Restaurant', lat: 39.885222, lon: 32.857118,
    address: 'Prof. Dr. Aziz Sancar Caddesi No:15, Çankaya',
    category: { en: 'Restaurant', tr: 'Restoran' }
  },
  {
    name: 'Cafemiz', lat: 39.898001, lon: 32.865699,
    address: 'Arjantin Caddesi No:19, Gaziosmanpaşa, Çankaya',
    category: { en: 'Cafe & restaurant', tr: 'Kafe ve restoran' }
  },
  {
    name: 'Düveroğlu', lat: 39.921602, lon: 32.855432,
    address: 'Selanik Caddesi No:18/A, Kızılay, Çankaya',
    category: { en: 'Kebab & lahmacun', tr: 'Kebap ve lahmacun' }
  },
  {
    name: 'Dino Dürüm', lat: 39.9153, lon: 32.8572,
    address: 'Konur Sokak No:51, Meşrutiyet, Çankaya',
    category: { en: 'Wraps', tr: 'Dürüm' }, approximate: true
  },
  {
    name: 'Haymatlos Mekan', lat: 39.913813, lon: 32.856984,
    address: 'Konur Sokak No:73/B, Kavaklıdere, Çankaya',
    category: { en: 'Cafe & pub', tr: 'Kafe ve pub' }
  },
  {
    name: 'Kayf Coffee', lat: 39.9156, lon: 32.8572,
    address: 'Konur Sokak No:44/A, Meşrutiyet, Çankaya',
    category: { en: 'Coffee shop', tr: 'Kahve dükkânı' }, approximate: true
  },
  {
    name: 'Ciğerci Apo', lat: 39.909793, lon: 32.818044,
    address: 'Ziyabey Caddesi No:38/AB, Balgat, Çankaya',
    category: { en: 'Liver kebab', tr: 'Ciğer kebabı' }
  },
  {
    name: 'Drupe Coffee & Stuff', lat: 39.928697, lon: 32.825312,
    address: 'Bahçelievler, 37. Sokak No:8, Çankaya',
    category: { en: 'Coffee shop', tr: 'Kahve dükkânı' }
  },
  {
    name: 'The Celt Irish Pub', lat: 39.929161, lon: 32.827046,
    address: 'Prof. Muammer Aksoy Caddesi No:29/B, Bahçelievler, Çankaya',
    category: { en: 'Irish pub', tr: 'İrlanda pubı' }
  }
];

function placeDetails(place) {
  const lang = window.getLanguage();
  const container = document.createElement('div');
  container.className = 'place-popup';

  const title = document.createElement('strong');
  title.textContent = place.name;
  container.appendChild(title);

  const type = document.createElement('span');
  type.className = 'place-category';
  type.textContent = place.category[lang];
  container.appendChild(type);

  const address = document.createElement('span');
  address.textContent = place.address;
  container.appendChild(address);

  if (place.approximate) {
    const note = document.createElement('small');
    note.textContent = window.t('maps.approximatePin');
    container.appendChild(note);
  }

  const directions = document.createElement('a');
  directions.textContent = window.t('maps.openInMaps');
  directions.href = 'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(place.name + ', ' + place.address + ', Ankara');
  directions.target = '_blank';
  directions.rel = 'noopener noreferrer';
  container.appendChild(directions);

  return container;
}
