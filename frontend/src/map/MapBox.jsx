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
import { LayersControl } from 'react-leaflet';

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
  const [coords, setCoords] = useState([]);

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'feature',
        geometry: {
          type: 'LineString',
          coordinates: [...coords],
        },
      },
    ],
  };

  const url =
    'https://api.mapbox.com/directions/v5/mapbox/driving/153.412281%2C-28.013914%3B153.04363%2C-27.47324?geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1Ijoib2xpdmVybW9zY2hlciIsImEiOiJjbHNsNms1MmYwOTd2MnFuOG83Mmh3N3k0In0.Hz_vjFeQ9nKuVCYMb7TQ_Q';
  const { status, error, data } = useQuery({
    queryKey: ['route'],
    queryFn: () => get(url),
  });
  const getRoute = async () => {
    // const { status, error, data } = await useQuery({
    //   queryKey: ['route'],
    //   queryFn: get(url),
    // });
  };

  useEffect(() => {
    if (data) {
      console.log(data.routes[0].geometry.coordinates);
      setCoords(data.routes[0].geometry.coordinates);
    }
  }, [data]);

  return (
    <div className="map-container">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      >
        <Source id="routeSource" type="geojson" data={geojson}>
          <Layer {...lineStyle} />
        </Source>
      </Map>
    </div>
  );
}

export default MapBox;
