import React, { useEffect, useId, useState } from 'react';
import { get } from '../../globalFunctions/api';
import { URLBuilder } from '../../globalFunctions/urlBuilder';
import { useQuery } from '@tanstack/react-query';

function useRoute(coordinates, id) {
  const url = URLBuilder.getDirectionsApiUrl(coordinates);

  //return States
  const [sourceElementData, setSourceElementData] = useState({
    id: 'routeSource' + id,
    type: 'geojson',
    data: {},
  });

  const [layerElementData] = useState({
    id: 'roadLayer' + id,
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
  });

  const { status, error, data } = useQuery({
    queryKey: ['route', id],
    queryFn: () => get(url),
    enabled: !!url,
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    console.log(url);
    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'feature',
          geometry: {
            type: 'LineString',
            coordinates: [...data.routes[0].geometry.coordinates],
          },
        },
      ],
    };
    setSourceElementData({ ...sourceElementData, data: geojson });
  }, [data]);

  return {
    route: {
      sourceElementData: sourceElementData,
      layerElementData: layerElementData,
    },
    error: error,
    status: status,
  };
}

export default useRoute;