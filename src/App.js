import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = "pk.eyJ1IjoidGhlZGV2bWFuIiwiYSI6ImNsMWVibGx6MjA2MHgzbHFra3RoMmwwbTYifQ.pOCEh7_GtXJqmA9-cTpagQ";


export default function App() { // Valores iniciais
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-43.8090);
  const [lat, setLat] = useState(-15.00017);
  const [zoom, setZoom] = useState(4.02);

  useEffect(() => {  //The function passed to useEffect will run after the render is committed to the screen.
    if (map.current) return; // Se o mapa já foi inicializado, não há necessidade de fazer outro, em outras palavras, o mapa é inicializado apenas uma vez.
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat], //Longitude - latitude
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // Espera o mapa ser inicializado.
    map.current.on('move', () => { //Quando o usuário interage com o mapa, movendo-o, os novos valores são armazenados. 
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });


  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.032, 38.913]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.414, 37.776]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      }
    ]
  };


  const markersJson = "https://dev-redes-ora.geodatin.com/api/station/projected/location";



  // for (const feature of geojson.features) {
  //   const marker = document.createElement('div');
  //   marker.className = 'marker';

  //   new mapboxgl.Marker(marker).setLngLat(feature.geometry.coordinate).addTo(map);
  // }




  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

;
