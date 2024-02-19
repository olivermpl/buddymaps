import React, { useEffect, useRef, useState } from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import './style/map.css';
import Route from '../route/Route';
import LocationPicker from '../route/locationPicker/LocationPicker';

function MapBox() {
  //MAP settings
  const [viewState, setViewState] = useState({
    longitude: 153.429642,
    latitude: -28.000767,
    zoom: 8,
    style: { width: '100vw', height: '100vh' },
  });

  const mapRef = useRef(null);

  const coords = [
    [153.412281, -28.013914],
    [153.04363, -27.47324],
    [152.665497, -26.190001],
  ];

  return (
    <div className="map-container">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        ref={mapRef}
      >
        {' '}
        <Route id="45455ABF" coordinates={coords} />
      </Map>
      <LocationPicker map={mapRef.current} />
    </div>
  );
}

export default MapBox;
