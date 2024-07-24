import Map from './node_modules/ol/Map';
import OSM from './node_modules/ol/source/OSM.js';
import Tile from './node_modules/ol/layer/Tile.js';
import View from './node_modules/ol/View.js';

import {toLonLat, fromLonLat} from './node_modules/ol/proj'
import {Point} from './node_modules/ol/geom'
import {Feature, Overlay} from './node_modules/ol'
import {Style, Circle, Fill, Stroke} from './node_modules/ol/style'
import {Vector as VectorSrc} from './node_modules/ol/source'   // ol.source.Vector
import {Vector as VectorLayer} from './node_modules/ol/layer' // ol.layer.Vector

let map;
let previewPoint;
function getMap(selector, arrBid, isEdit = false) {
  map = new Map({
    target: selector,
    layers: [
      new Tile({
        source: new OSM()
      })
    ],
    view: new View({
      center: fromLonLat([39.7240450, 47.2366003]),
      zoom: 12
    }),
  });

  map.on('click', function(e) {
    const coord = e.coordinate;
    //console.log('Координаты клика:', toLonLat(coord).map(coord => coord.toFixed(10)));
    if (isEdit){
      if (previewPoint) map.removeLayer(previewPoint);

      previewPoint = new VectorLayer({
        source: new VectorSrc({
          features: [new Feature({
            geometry: new Point(coord)
          })]
        })
      });
      map.addLayer(previewPoint);
    }
    if (document.getElementById(selector)) document.getElementById(selector).setAttribute('value', toLonLat(coord).map(coord => coord.toFixed(10)).toString())
  })

  arrBid.forEach(function(marker) {
    const markerElement = new Feature({
      geometry: new Point(fromLonLat(marker.coords))
    });

    let colorMark;
    switch (marker.priority){
      case '1 - Незамедлительно': 
      colorMark = 'red';
        break;
      case '2 - Высокий':
        colorMark = 'yellow';
        break;
      case '3 - Средний':
        colorMark = 'green';
        break;
      case '4 - Низкий':
        colorMark = 'grey'
        break;
      default: 
      colorMark = 'blue';
    }

    const markerStyle = new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({ color: colorMark }),
        stroke: new Stroke({ color: 'black', width: 1 })
      })
    });

    markerElement.setStyle(markerStyle);

    markerElement.set('address', marker.address);
    markerElement.set('coords', marker.coords);
    markerElement.set('crashType', marker.crashType);
    markerElement.set('priority', marker.priority);
    markerElement.set('reporter', marker.reporter);
    markerElement.set('phoneNumber', marker.phoneNumber);

    const overlay = new Overlay({
      element: document.createElement('div'),
      positioning: 'bottom-center'
    });

    map.addOverlay(overlay);

    map.on('pointermove', function(e) {
      // отображение информации
      if (!isEdit){
        map.forEachFeatureAtPixel(e.pixel, function(feature) {
          const coordinate = feature.getGeometry().getCoordinates();
          overlay.setPosition(coordinate);
          overlay.getElement().innerHTML = `<div id='mapInfo'>
                                              <p>${feature.get('address')}</p>
                                              <p>${feature.get('coords')}</p>
                                              <p>${feature.get('crashType')}</p>
                                              <p>${feature.get('priority')}</p>
                                              <p>${feature.get('reporter')}</p>
                                              <p>${feature.get('phoneNumber')}</p>
                                            </div> `;
        });
      }
    });

    const vectorSource = new VectorSrc({
      features: [markerElement]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    map.addLayer(vectorLayer);
  });
}

export default getMap ;