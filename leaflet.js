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

  const threshold = 11;
  const map = L.map('leaflet-map', {
    center: [39.922, 32.855],
    zoom: 11,
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

  const markerLayer = L.layerGroup();
  const markers = foodPlaces.map(place => {
    const marker = L.marker([place.lat, place.lon]).addTo(markerLayer);
    marker.bindPopup(placeDetails(place));
    return { marker, place };
  });

  function updateMap() {
    const zoom = map.getZoom();
    const visible = zoom >= threshold;
    if (visible && !map.hasLayer(markerLayer)) markerLayer.addTo(map);
    if (!visible && map.hasLayer(markerLayer)) map.removeLayer(markerLayer);

    markers.forEach(({ marker, place }) => marker.setPopupContent(placeDetails(place)));
    const label = visible
      ? window.t('maps.statusVisible').replace('{count}', foodPlaces.length)
      : window.t('maps.statusHidden');
    status.textContent = `${window.t('maps.statusZoom')}: ${zoom} · ${label} · ${window.t('maps.statusThreshold')}: ${threshold}`;
  }

  map.on('zoomend', updateMap);
  window.addEventListener('languagechange', updateMap);
  updateMap();
})();
