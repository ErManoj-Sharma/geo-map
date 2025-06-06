import { createGeoJSON } from './createGeoJson';
import { removeLayer } from './removeLayer';
import { TropicofCancerGeoJson } from './createGeoJson';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
/**
 * Handles Tropic of Cancer state labels and line layer.
 * @param {Object} map - Mapbox map instance (ref).
 * @param {Array} tropicStates - Array of states the tropic passes through.
 */
export const handleTropicOfCancer = (map, tropicStates) => {
  const stateLayerId = 'tropic-of-cancer-st-names';
  const stateSourceId = 'tropic-of-cancer-st-labels';
  const lineLayerId = 'tropic-of-cancer-names';
  const lineSourceId = 'tropic-of-cancer-labels';

  if (!map.current) return;

  if (Array.isArray(tropicStates)) {
    removeLayer(map, stateLayerId, stateSourceId);
    removeLayer(map, lineLayerId, lineSourceId);

    const stateLabelsGeoJSON = createGeoJSON(tropicStates);

    map.current.addSource(stateSourceId, {
      type: 'geojson',
      data: stateLabelsGeoJSON,
    });

    map.current.addLayer({
      id: stateLayerId,
      type: 'symbol',
      source: stateSourceId,
      layout: {
        'text-field': ['get', 'name'],
        'text-size': 14,
        'text-anchor': 'center',
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      },
      paint: {
        'text-color': '#FF4500',
        'text-halo-color': '#fff',
        'text-halo-width': 1,
      },
    });

    map.current.addSource(lineSourceId, {
      type: 'geojson',
      data: TropicofCancerGeoJson,
    });

    map.current.addLayer({
      id: lineLayerId,
      type: 'line',
      source: lineSourceId,
      paint: {
        'line-color': '#FF4500',
        'line-dasharray': [2, 2],
        'line-width': 2,
      },
    });

     map.current.on("click", "tropic-of-cancer-names", (e) => {
                const coordinates = e.lngLat;
                const { name } = e.features[0].properties;
                // Create HTML content for popup with title and description
                const popupContent = document.createElement('div');
                popupContent.style.backgroundColor = 'white';
                popupContent.style.color = 'black';
    
                if (name) {
                    const nameEl = document.createElement('p');
                    nameEl.textContent = name;
                    nameEl.style.margin = '0';
                    nameEl.style.textAlign = 'center'; // 👈 Center-align the text
                    popupContent.appendChild(nameEl);
                }
    
                new maptilersdk.Popup({ offset: 25 }).setDOMContent(popupContent)
                    .setLngLat(coordinates)
                    .setHTML(popupContent.outerHTML)
                    .addTo(map.current);
            })
    
  } else {
    removeLayer(map, stateLayerId, stateSourceId);
    removeLayer(map, lineLayerId, lineSourceId);
  }
};
