import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Layer, Marker, Source } from 'react-map-gl';
import { useQuery } from '@tanstack/react-query';
import { get } from '../globalFunctions/api';
import { URLBuilder } from '../globalFunctions/urlBuilder';
import { ROUTECONTEXTTYPES, RouteContext } from './RouteContext';

const REDUCERTYPES = {};

function reducer(state, { type, payload }) {
  switch (type) {
    default:
      break;
  }
}
function RouteComponent(props) {
  const [sourceElementData, setSourceElementData] = useState({
    id: 'routeSource' + props._id,
    type: 'geojson',
    data: {},
  });

  const [layerElementData] = useState({
    id: 'roadLayer' + props._id,
    type: 'line',
    layout: {
      'line.join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': props.color,
      'line-width': 4,
      'line-opacity': 0.75,
    },
  });

  const [url, setUrl] = useState(
    URLBuilder.getDirectionsApiUrl(props.getCoordinates())
  );

  const { status, error, data, refetch } = useQuery({
    queryKey: ['route', props._id],
    queryFn: () => get(URLBuilder.getDirectionsApiUrl(props.getCoordinates())),
    enabled: !!url,
  });

  const { dispatch: ctxDispatch } = useContext(RouteContext);

  //create SourceElement, when Data is retrieved
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

  //when Path is changed refetch new Route
  useEffect(() => {
    refetch();
  }, [props.path]);

  return (
    <>
      <Source {...sourceElementData}>
        <Layer {...layerElementData} />
      </Source>{' '}
      *{' '}
      {props.getCoordinates().map((coord) => {
        return (
          <Marker
            latitude={coord[1]}
            longitude={coord[0]}
            key={`${coord[0]}-${coord[1]}}`}
            onClick={() =>
              ctxDispatch({
                type: ROUTECONTEXTTYPES.setSelectedRoute,
                payload: { _id: props._id },
              })
            }
          >
            <div className="h-[20px] w-[20px] bg-red-500 rounded-full hover:border border-black"></div>
          </Marker>
        );
      })}
    </>
  );
}

export default RouteComponent;
