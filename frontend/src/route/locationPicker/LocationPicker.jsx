import React, { useState } from 'react';
import { AddressAutofill, SearchBox } from '@mapbox/search-js-react';
import mapboxgl from 'mapbox-gl';

function LocationPicker(props) {
  const [value, setValue] = useState('');
  const onRetrieve = (e) => {
    console.log(e);
  };
  return (
    <div className="w-[500px] h-[500px] bg-white absolute top-8 right-8 flex z-50 flex-col items-center">
      <p>LocationPicker</p>
      <form className="w-full flex flex-col items-center gap-8 mt-4">
        <SearchBox
          accessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          options={{ types: 'city' }}
          onRetrieve={onRetrieve}
          map={props.map}
          marker={true}
          mapboxgl={props.map}
          value={value}
          onChange={(v) => {
            setValue(v);
            console.log('change ', v);
          }}
        />
      </form>
    </div>
  );
}

export default LocationPicker;
