import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Grafico from './components/Grafico';


mapboxgl.accessToken = "pk.eyJ1IjoidGhlZGV2bWFuIiwiYSI6ImNsMWVibGx6MjA2MHgzbHFra3RoMmwwbTYifQ.pOCEh7_GtXJqmA9-cTpagQ";


export default function App() { // Valores iniciais
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-43.8090);
  const [lat, setLat] = useState(-15.00017);
  const [zoom, setZoom] = useState(4.02);
  const location = require('./data/location.json');

  useEffect(() => {  //The function passed to useEffect will run after the render is committed to the screen.
    if (map.current) return; // Se o mapa já foi inicializado, não há necessidade de cria-lo novamente, em outras palavras, o mapa é inicializado apenas uma vez.
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat], //Longitude - latitude
      zoom: zoom
    });
  });


  useEffect(() => {
    if (!map.current) return; // Espera o mapa ser inicializado.

    // Adiciona os botões de interação
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

    map.current.on('move', () => { //Quando o usuário interage com o mapa, movendo-o, os novos valores são armazenados. 
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    console.log(location);
    for (const feature of location.features) {
      // Cria uma div para cada marker;
      if (feature.properties.responsible != null) {

        const marker = document.createElement('div');
        marker.className = 'marker';
        console.log(feature.properties);

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(marker).setLngLat(feature.geometry.coordinates).addTo(map.current);
      }
    };
    return () => map.remove();
  }, []);



  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className='grafico'><p>Estatísticas</p><Grafico></Grafico> </div>
      <div ref={mapContainer} className="map-container">
      </div>
    </div>
  );
}

;
