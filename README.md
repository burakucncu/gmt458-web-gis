# Geomatics Portfolio · GMT 458

A personal website for the GMT 458 Web GIS course at Hacettepe University.

## Pages

- **Home (`index.html`)** — Introduction, interests, and technologies.
- **Projects (`projects.html`)** — Four GitHub projects and an illustrated comparison table.
- **Maps (`maps.html`)** — Interactive Leaflet and OpenLayers maps.

The website supports **English** and **Turkish**. English is the default language; the EN / TR selector in the navigation bar saves the preferred language for other pages.

## Projects

| Project | Repository |
| --- | --- |
| GNSS NMEA Parser | [burakucncu/gnss-nmea-parser](https://github.com/burakucncu/gnss-nmea-parser) |
| Nimbus-Edge | [burakucncu/nimbus-edge](https://github.com/burakucncu/nimbus-edge) |
| Aegis | [burakucncu/aegis](https://github.com/burakucncu/aegis) |
| Sat-Track | [burakucncu/sat-track](https://github.com/burakucncu/sat-track) |

## Web GIS

Both maps display ten restaurants, cafes and pubs around Ankara. Location markers are hidden below zoom level **11**.

- **Leaflet:** The marker layer is controlled by the `zoomend` event. The OpenStreetMap tile layer uses `noWrap: true`, and map bounds limit horizontal navigation.
- **OpenLayers:** Vector marker visibility follows the view resolution. The tile and vector sources use `wrapX: false`, and the map view has a bounded extent.

The locations are listed in `places.js`. The pins for Dino Dürüm (Konur branch) and Kayf Coffee are approximate. Each popup includes an address and a map-search link. Images in `images/` are schematic illustrations, not screenshots. Map tiles and libraries are loaded online.

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser. Internet access is required to load the online maps.

## Technologies

HTML, CSS, JavaScript, Leaflet, OpenLayers, OpenStreetMap.

## Git and publishing

The assignment requires at least **three commits on separate calendar days**. The suggested schedule is in [`COMMIT_PLANI.md`](COMMIT_PLANI.md). Commits must be created on their actual dates.

For GitHub Pages, open your repository's **Settings → Pages** and select **Deploy from a branch → main → /(root)**.

## AI usage disclosure

The following topics were discussed or assisted with ChatGPT while preparing this project:

- HTML/CSS page structure and responsive layout.
- Language selection with JavaScript and browser storage.
- Leaflet and OpenLayers marker visibility, popups and world wrapping settings.
- Project page organization and Git workflow planning.

**Estimated total AI usage:** _[Enter your own accurate estimate in minutes/hours before submission]._

Review this section before submission to ensure it accurately reflects your work. The course requires an AI usage description and a time estimate in the README.

## Dates

- Assignment deadline: **12 October 2026**
- Peer-review deadline: **23 October 2026**
- Review portal: https://gmt458.hacettepe.edu.tr/
