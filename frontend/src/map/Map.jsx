import { useEffect, useRef, useState } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';

import './style/map.css';
import 'leaflet/dist/leaflet.css';

function Map() {
  const mapProperties = {
    center: { lat: -28.000767, lng: 153.429642 },
    ZOOM_LEVEL: 12,
    maptilerURL: import.meta.env.VITE_MAPTILE_URL,
  };
  const mapRef = useRef();

  return (
    <MapContainer
      center={mapProperties.center}
      zoom={mapProperties.ZOOM_LEVEL}
      ref={mapRef}
    >
      <TileLayer url={mapProperties.maptilerURL} />
    </MapContainer>
  );
}

export default Map;
