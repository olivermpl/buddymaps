import { createContext, useEffect, useReducer } from 'react';
import { seedRoutes } from '../assets/mockData';

export const RouteContext = createContext();

export const ROUTECONTEXTTYPES = {
  initRoutes: 'initRoutes',
  addPointToRoute: 'addPointToRoute',
  setSelectedRoute: 'setSelectedRoute',
  unselectRoute: 'unselectRoute',
};

function reducer(state, { type, payload }) {
  switch (type) {
    //init Routes or set a new Collection of Routes
    case ROUTECONTEXTTYPES.initRoutes:
      return { ...state, routes: [...payload] };

    //add Coordinates to a Route
    case ROUTECONTEXTTYPES.addPointToRoute:
      //maps through array, when right array is found, coordinates are added and an order-flag as well
      var routes = state.routes.map((r) => {
        if (r._id !== payload._id) {
          return r;
        }
        return {
          ...r,
          path: [...r.path, { order: r.path.length + 1, ...payload.data }],
        };
      });

      return { ...state, routes: [...routes] };
    //select Route
    case ROUTECONTEXTTYPES.setSelectedRoute:
      var route = state.routes.find((r) => r._id === payload._id);
      if (route) {
        return { ...state, selectedRoute: route };
      }
      throw new Error('Error: Route was not found');

    case ROUTECONTEXTTYPES.unselectRoute:
      return { ...state, selectedRoute: {} };
    default:
      return state;
  }
}

export function RouteContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, {
    routes: [],
    selectedRoute: {},
  });
  const value = {
    routes: state.routes,
    selectedRoute: state.selectedRoute,
    dispatch,
  };

  useEffect(() => {
    dispatch({ type: ROUTECONTEXTTYPES.initRoutes, payload: seedRoutes });
  }, []);

  return (
    <RouteContext.Provider value={value}>
      {props.children}
    </RouteContext.Provider>
  );
}
