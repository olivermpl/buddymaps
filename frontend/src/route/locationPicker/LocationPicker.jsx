import React, { useContext, useState } from 'react';
import { AddressAutofill, SearchBox } from '@mapbox/search-js-react';
import mapboxgl from 'mapbox-gl';
import { ROUTECONTEXTTYPES, RouteContext } from '../RouteContext';

function LocationPicker(props) {
  const [value, setValue] = useState('');
  const { dispatch: ctxDispatch } = useContext(RouteContext);

  const onRetrieve = (e) => {
    const coords = e.features[0].geometry.coordinates;
    ctxDispatch({
      type: ROUTECONTEXTTYPES.addPointToRoute,
      payload: { _id: 1, coordinates: coords },
    });
  };
  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="w-[500px] h-[500px] bg-white absolute top-8 right-8 flex z-50 flex-col items-center">
      <p>LocationPicker</p>
      <form
        className="w-full flex flex-col items-center gap-8 mt-4"
        onSubmit={onSubmit}
      >
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
