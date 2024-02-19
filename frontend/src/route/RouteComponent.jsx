import React, { useEffect, useReducer } from 'react';
import { Layer, Marker, Source } from 'react-map-gl';
import useRoute from './hooks/useRoute';

const REDUCERTYPES = {};

function reducer(state, { type, payload }) {
  switch (type) {
    default:
      break;
  }
}
function RouteComponent(props) {
  const { route } = useRoute({
    coords: props.getCoordinates(),
    id: props._id,
    color: props.color,
  });

  return (
    <>
      <Source {...route.sourceElementData}>
        <Layer {...route.layerElementData} />
      </Source>{' '}
      *{' '}
      {props.getCoordinates().map((coord) => {
        return (
          <Marker
            latitude={coord[1]}
            longitude={coord[0]}
            key={`${coord[0]}-${coord[1]}}`}
          >
            <div className="h-[20px] w-[20px] bg-red-500 rounded-full"></div>
          </Marker>
        );
      })}
    </>
  );
}

export default RouteComponent;
