import React, { useEffect, useRef, useState } from 'react';
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  Source,
  Layer,
  NavigationControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import './style/map.css';
import { useQuery } from '@tanstack/react-query';
import { get } from '../globalFunctions/api';
import useRoute from '../route/useRoute';

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
    style: { width: '50vw', height: '50vh' },
  });

  const coords = [
    [153.412281, -28.013914],
    [153.04363, -27.47324],
  ];

  const { sourceElementData, layerElementData, status } = useRoute(coords);

  useEffect(() => {
    if (status === 'success') {
      console.log(sourceElementData);
      console.log(layerElementData);
    }
  }, [status]);

  return (
    <div className="map-container">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      >
        <Source {...sourceElementData}>
          <Layer {...layerElementData} />
        </Source>
      </Map>
    </div>
  );
}

export default MapBox;
