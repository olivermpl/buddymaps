import { useRef, useState } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';

import './style/map.css';
import 'leaflet/dist/leaflet.css';

function Map() {
  const [center] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();
  const meta = {
    maptiler: {
      url: 'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=EuPXUkcUdCkWLRjsFytm',
      attribution:
        '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    },
  };

  return (
    <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
      <TileLayer url={meta.maptiler.url} />
    </MapContainer>
  );
}

export default Map;
