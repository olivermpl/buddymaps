import React from 'react';
import { Layer, Marker, Source } from 'react-map-gl';
import useRoute from './hooks/useRoute';

function Route({ id, coordinates }) {
  const { route } = useRoute(coordinates, id);
  return (
    <>
      <Source {...route.sourceElementData}>
        <Layer {...route.layerElementData} />
      </Source>{' '}
      {coordinates.map((coord) => {
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

export default Route;
