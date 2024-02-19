import React, { useContext, useEffect, useRef, useState } from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import './style/map.css';
import RouteComponent from '../route/RouteComponent';
import LocationPicker from '../route/locationPicker/LocationPicker';
import { RouteContext } from '../route/RouteContext';

function MapBox() {
  //MAP settings
  const [viewState, setViewState] = useState({
    longitude: 153.429642,
    latitude: -28.000767,
    zoom: 8,
    style: { width: '100vw', height: '100vh' },
  });

  const mapRef = useRef(null);
  const { routes, dispatch: ctxDispatch } = useContext(RouteContext);

  return (
    <div className="map-container">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        ref={mapRef}
      >
        {routes.map((r) => (
          <RouteComponent key={r._id} {...r} />
        ))}
      </Map>
      <LocationPicker map={mapRef.current} />
    </div>
  );
}

export default MapBox;
