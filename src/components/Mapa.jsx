import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = "pk.eyJ1IjoidGhlZGV2bWFuIiwiYSI6ImNsMWVibGx6MjA2MHgzbHFra3RoMmwwbTYifQ.pOCEh7_GtXJqmA9-cTpagQ";

export default function App() { // Valores iniciais
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-43.8090);
    const [lat, setLat] = useState(-15.00017);
    const [zoom, setZoom] = useState(3.75);
    const location = require('../data/location.json');

    useEffect(() => {
        if (map.current) return; // o Mapa é inicializado apenas uma vez.
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [lng, lat], //Longitude - latitude
            zoom: zoom
        });
    });


    useEffect(() => {
        if (!map.current) return; // Espera o mapa ser inicializado.

        map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-left'); // Adiciona os botões de interação

        map.current.on('move', () => { //Quando o usuário interage com o mapa, movendo-o, os novos valores são armazenados. 
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        for (const feature of location.features) {
            if (feature.properties.responsible != null) { // Apenas marcadores que possuem algum valor em "responsible" serão adicionados.
                const marker = document.createElement('div');
                marker.className = 'marker';
                new mapboxgl.Marker(marker).setLngLat(feature.geometry.coordinates).setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // Adiciona op popups.
                        .setHTML(
                            `<h3>${feature.properties.country}</h3><p>${feature.properties.responsible} ${feature.properties.network}</p>`
                        )
                ).addTo(map.current);
            }
        };
        return () => map.remove();
    }, []);


    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container">
            </div>
        </div>
    );
};