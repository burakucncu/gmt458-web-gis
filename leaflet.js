(function () {
  const status = document.getElementById('leaflet-status');
  if (!status) return;
  if (typeof L === 'undefined') {
    status.textContent = window.t('maps.errorLeaflet');
    window.addEventListener('languagechange', () => {
      status.textContent = window.t('maps.errorLeaflet');
    });
    return;
  }

  const threshold = 7;
  const map = L.map('leaflet-map', {
    center: [39.2, 35.0],
    zoom: 5,
    minZoom: 2,
    maxZoom: 18,
    maxBounds: [[-85, -180], [85, 180]],
    maxBoundsViscosity: 1
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    noWrap: true,
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const locations = [
    { name: 'Ankara', lat: 39.9334, lon: 32.8597, info: 'maps.ankaraInfo' },
    { name: 'İstanbul', lat: 41.0082, lon: 28.9784, info: 'maps.istanbulInfo' },
    { name: 'maps.vanName', lat: 38.6220, lon: 42.8760, info: 'maps.vanInfo' },
    { name: 'maps.barcelonaName', lat: 41.3874, lon: 2.1686, info: 'maps.barcelonaInfo' }
  ];

  const markerLayer = L.layerGroup();
  const markers = locations.map(place => {
    const marker = L.marker([place.lat, place.lon]).addTo(markerLayer);
    marker.bindPopup('');
    return { marker, place };
  });

  function updateMap() {
    const zoom = map.getZoom();
    const visible = zoom >= threshold;
    if (visible && !map.hasLayer(markerLayer)) markerLayer.addTo(map);
    if (!visible && map.hasLayer(markerLayer)) map.removeLayer(markerLayer);

    markers.forEach(({ marker, place }) => {
      const name = place.name.startsWith('maps.') ? window.t(place.name) : place.name;
      marker.setPopupContent(`<strong>${name}</strong><br>${window.t(place.info)}<br><small>${place.lat.toFixed(4)}°, ${place.lon.toFixed(4)}°</small>`);
    });

    const label = visible
      ? window.t('maps.statusVisible').replace('{count}', locations.length)
      : window.t('maps.statusHidden');
    status.textContent = `${window.t('maps.statusZoom')}: ${zoom} · ${label} · ${window.t('maps.statusThreshold')}: ${threshold}`;
  }

  map.on('zoomend', updateMap);
  window.addEventListener('languagechange', updateMap);
  updateMap();
})();
