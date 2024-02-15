export class URLBuilder {
  /*
    Builds the url for the Directions API

    @params {array} coordinates: coordinates for the route 
    @params {obj} params: Takes in optional parameters to the url (for future use)
    
     */
  static getDirectionsApiUrl(coordinates, params) {
    validateCoordinates(coordinates);

    let options = {
      mode: 'driving',
      coordinates: coordinates,
      geometries: 'geojson',
      language: 'en',
      overview: 'simplified',
      access_token: import.meta.env.VITE_MAPBOX_TOKEN,
    };

    //TO-Do create params functionality
    let hostname = `https://api.mapbox.com/directions/v5/mapbox/${options.mode}/`;

    //add Coordinates
    coordinates.forEach((coord, index) => {
      //dont concat with ';' on the first index
      if (index === 0) {
        hostname += `${coord[0]},${coord[1]}`;
      } else {
        hostname += `;${coord[0]},${coord[1]}`;
      }
    });
    const url = new URL(hostname);

    url.searchParams.set('geometries', options.geometries);
    url.searchParams.set('language', options.language);
    url.searchParams.set('overview', options.overview);
    url.searchParams.set('access_token', options.access_token);

    //console.log(`URL: ${url}`);
    return url;
  }
}
/*
    Checks if coodrinates are valide
    @params {array} coordinates: They must have following structure: [[153.5454,-23.32],[143.45,34.454],...]. 
                                it must consist of at least 2 coordinate pairs. Each pairs must consist of exactly 2 doubles. Each double is one coordiante
    */
const validateCoordinates = (coordinateList) => {
  if (!Array.isArray(coordinateList)) {
    throw new TypeError('Coordinatelist must be an Array');
  }
  if (coordinateList.length < 2) {
    throw new Error('Must be at least 2 coordinates Pairs');
  }

  /*check for innerArray for validity
        first two checks are same as the list array 
        last two are for the coordinate pairs. 
        Because the pair is expected to have two elements, you can hardcode the indexes
    */
  coordinateList.forEach((coordinatePair) => {
    if (!Array.isArray(coordinatePair)) {
      throw new TypeError('Coordinate Pair must be an Array');
    }
    if (coordinatePair.length !== 2) {
      throw new Error('Coordinate Pair must be exactly be 2 Elements');
    }

    if (typeof coordinatePair[0] !== 'number' || isNaN(coordinatePair[0])) {
      throw new TypeError('Coordinate must be a number');
    }
    if (typeof coordinatePair[1] !== 'number' || isNaN(coordinatePair[1])) {
      throw new TypeError('Coordinate must be a number');
    }
  });
};
