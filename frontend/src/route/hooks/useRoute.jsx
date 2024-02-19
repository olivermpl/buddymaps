import React, { useEffect, useId, useState } from 'react';
import { get } from '../../globalFunctions/api';
import { URLBuilder } from '../../globalFunctions/urlBuilder';
import { useQuery } from '@tanstack/react-query';

const USEROUTEDISPATCHTYPES = {
  addRoutePoint: 'addRoutePoint',
};

function useRoute(coords, id) {
  const dispatch = (type, payload) => {
    switch (type) {
      default:
        break;
    }
  };
  const [coordinates] = useState(coords);
  const [url, setUrl] = useState(URLBuilder.getDirectionsApiUrl(coords));

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

  useEffect(() => {
    setUrl(URLBuilder.getDirectionsApiUrl(coordinates));
  }, [coordinates]);

  return {
    route: {
      sourceElementData: sourceElementData,
      layerElementData: layerElementData,
    },
    error: error,
    status: status,
    dispatch: dispatch,
  };
}

export default useRoute;
