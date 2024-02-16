import React, { useEffect, useRef, useState } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import './style/map.css';
import { useQuery } from '@tanstack/react-query';
import { get } from '../globalFunctions/api';
import useRoute from '../route/hooks/useRoute';
import Route from '../route/Route';

const lineStyle = {
  id: 'roadLayer',
  type: 'line',
  layout: {
    'line.join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': 'blue',
    'line-width': 4,
    'line-opacity': 0.75,
  },
};

function MapBox() {
  const [viewState, setViewState] = useState({
    longitude: 153.429642,
    latitude: -28.000767,
    zoom: 8,
    style: { width: '100vw', height: '100vh' },
  });

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
      >
        {' '}
        <Route id="45455ABF" coordinates={coords} />
      </Map>
    </div>
  );
}

export default MapBox;
