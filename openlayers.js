(function () {
  const status = document.getElementById('openlayers-status');
  if (!status) return;
  if (typeof ol === 'undefined') {
    status.textContent = window.t('maps.errorOl');
    window.addEventListener('languagechange', () => {
      status.textContent = window.t('maps.errorOl');
    });
    return;
  }

  const threshold = 7;
  const maxExtent = 20037508.342789244;
  const cities = [
    { name: 'Ankara', lon: 32.8597, lat: 39.9334 },
    { name: 'İstanbul', lon: 28.9784, lat: 41.0082 },
    { name: 'İzmir', lon: 27.1428, lat: 38.4237 },
    { name: 'Antalya', lon: 30.7133, lat: 36.8969 },
    { name: 'Konya', lon: 32.4846, lat: 37.8746 },
    { name: 'Kayseri', lon: 35.4826, lat: 38.7225 },
    { name: 'Trabzon', lon: 39.7168, lat: 41.0027 },
    { name: 'Van', lon: 43.3760, lat: 38.4891 }
  ];

  const features = cities.map(city => new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([city.lon, city.lat])),
    name: city.name,
    longitude: city.lon,
    latitude: city.lat
  }));

  const markers = new ol.layer.Vector({
    source: new ol.source.Vector({ features, wrapX: false }),
    style: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({ color: '#137da4' }),
        stroke: new ol.style.Stroke({ color: '#ffffff', width: 2 })
      })
    }),
    visible: false
  });

  const view = new ol.View({
    center: ol.proj.fromLonLat([35, 39.2]),
    zoom: 5,
    minZoom: 2,
    maxZoom: 18,
    extent: [-maxExtent, -maxExtent, maxExtent, maxExtent]
  });

  const map = new ol.Map({
    target: 'openlayers-map',
    layers: [new ol.layer.Tile({ source: new ol.source.OSM({ wrapX: false }) }), markers],
    view
  });

  const popupElement = document.getElementById('ol-popup');
  const popup = new ol.Overlay({ element: popupElement, positioning: 'bottom-center', offset: [0, -13], stopEvent: false });
  map.addOverlay(popup);

  function updateMap() {
    const zoom = view.getZoom() ?? 0;
    const visible = zoom >= threshold;
    markers.setVisible(visible);
    if (!visible) {
      popup.setPosition(undefined);
      popupElement.hidden = true;
    }
    const label = visible
      ? window.t('maps.statusVisible').replace('{count}', cities.length)
      : window.t('maps.statusHidden');
    status.textContent = `${window.t('maps.statusZoom')}: ${zoom.toFixed(1)} · ${label} · ${window.t('maps.statusThreshold')}: ${threshold}`;
  }

  view.on('change:resolution', updateMap);
  window.addEventListener('languagechange', updateMap);
  updateMap();

  map.on('singleclick', event => {
    if (!markers.getVisible()) return;
    const feature = map.forEachFeatureAtPixel(event.pixel, item => item, {
      layerFilter: layer => layer === markers
    });
    if (!feature) {
      popup.setPosition(undefined);
      popupElement.hidden = true;
      return;
    }
    popupElement.textContent = `${feature.get('name')} · ${feature.get('latitude').toFixed(4)}°, ${feature.get('longitude').toFixed(4)}°`;
    popupElement.hidden = false;
    popup.setPosition(feature.getGeometry().getCoordinates());
  });
})();
