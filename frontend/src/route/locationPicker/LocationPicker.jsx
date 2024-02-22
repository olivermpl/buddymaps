import React, { useContext, useState } from 'react';
import { AddressAutofill, SearchBox } from '@mapbox/search-js-react';
import mapboxgl from 'mapbox-gl';
import { ROUTECONTEXTTYPES, RouteContext } from '../RouteContext';
import RouteDetailView from '../RouteDetailView';

function LocationPicker(props) {
  const [value, setValue] = useState('');
  const { selectedRoute, dispatch: ctxDispatch } = useContext(RouteContext);

  const onRetrieve = (e) => {
    const coords = e.features[0].geometry.coordinates;
    ctxDispatch({
      type: ROUTECONTEXTTYPES.addPointToRoute,
      payload: {
        _id: 1,
        data: {
          coordinates: coords,
          name: e.features[0].properties.name,
        },
      },
    });
    setValue('');
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
          value={value}
          onChange={(v) => {
            setValue(v);
          }}
        />
      </form>
      {selectedRoute._id && (
        <RouteDetailView {...selectedRoute}></RouteDetailView>
      )}
    </div>
  );
}

export default LocationPicker;
