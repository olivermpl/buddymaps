import React from 'react';
import { Layer, Source } from 'react-map-gl';
import useRoute from './hooks/useRoute';

function Route({ id, coordinates }) {
  const { route } = useRoute(coordinates, id);
  return (
    <>
      <Source {...route.sourceElementData}>
        <Layer {...route.layerElementData} />
      </Source>{' '}
    </>
  );
}

export default Route;
