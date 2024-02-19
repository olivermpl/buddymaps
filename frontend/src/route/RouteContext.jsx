import { createContext, useEffect, useReducer } from 'react';
import { seedRoutes } from '../assets/mockData';

export const RouteContext = createContext();

export const ROUTECONTEXTTYPES = {
  initRoutes: 'initRoutes',
  addPointToRoute: 'addPointToRoute',
};

function reducer(state, { type, payload }) {
  switch (type) {
    //init Routes or set a new Collection of Routes
    case ROUTECONTEXTTYPES.initRoutes:
      return [...payload];

    //add Coordinates to a Route
    case ROUTECONTEXTTYPES.addPointToRoute:
      let route = state.filter((r) => r._id === payload._id);
      if (route.length === 0) {
        throw new Error("Can't add Coordinates, Route-Id not found");
      }
      route = {
        ...route[0],
        path: [
          ...route[0].path,
          { coordinates: payload.coordinates, order: route[0].path.length + 1 },
        ],
      };

      return [...state, route];
    default:
      return state;
  }
}

export function RouteContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, []);
  const value = { routes: state, dispatch };

  useEffect(() => {
    dispatch({ type: ROUTECONTEXTTYPES.initRoutes, payload: seedRoutes });
  }, []);

  return (
    <RouteContext.Provider value={value}>
      {props.children}
    </RouteContext.Provider>
  );
}
