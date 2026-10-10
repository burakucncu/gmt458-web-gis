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

  const threshold = 11;
  const maxExtent = 20037508.342789244;
  const features = foodPlaces.map(place => new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([place.lon, place.lat])),
    place
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
    center: ol.proj.fromLonLat([32.855, 39.922]),
    zoom: 11,
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
  const popup = new ol.Overlay({
    element: popupElement,
    positioning: 'bottom-center',
    offset: [0, -13],
    stopEvent: true
  });
  map.addOverlay(popup);

  let selectedPlace = null;

  function updateMap() {
    const zoom = view.getZoom() ?? 0;
    const visible = zoom >= threshold;
    markers.setVisible(visible);
    if (!visible) {
      popup.setPosition(undefined);
      popupElement.hidden = true;
      selectedPlace = null;
    } else if (selectedPlace) {
      popupElement.replaceChildren(placeDetails(selectedPlace));
    }
    const label = visible
      ? window.t('maps.statusVisible').replace('{count}', foodPlaces.length)
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
      selectedPlace = null;
      return;
    }
    selectedPlace = feature.get('place');
    popupElement.replaceChildren(placeDetails(selectedPlace));
    popupElement.hidden = false;
    popup.setPosition(feature.getGeometry().getCoordinates());
  });
})();
