export const seedRoutes = [
  {
    _id: 1,
    owner: 1,
    color: '#32a852',
    path: [
      {
        coordinates: [153.412281, -28.013914],
        arrivaleDate: new Date(),
        order: 1,
        transportationMode: 'car',
        name: 'Gold Coast',
      },
      {
        coordinates: [153.04363, -27.47324],
        arrivaleDate: new Date(),
        order: 2,
        transportationMode: 'car',
        name: 'Brisbane',
      },
      {
        coordinates: [152.665497, -26.190001],
        arrivaleDate: new Date(),
        order: 3,
        transportationMode: 'car',
        name: 'Gympie',
      },
    ],
    getCoordinates: function () {
      return this.path.map((p) => {
        return p.coordinates;
      });
    },
  },
  {
    _id: 2,
    owner: 2,
    color: '#3253a8',
    path: [
      {
        coordinates: [153.2897222222, -28.0469444444],
        arrivaleDate: new Date(),
        order: 1,
        transportationMode: 'car',
      },
      {
        coordinates: [153.166666, -28.0333332],
        arrivaleDate: new Date(),
        order: 2,
        transportationMode: 'car',
      },
    ],
    getCoordinates: function () {
      return this.path.map((p) => {
        return p.coordinates;
      });
    },
  },
];

const users = [
  {
    name: 'Oliver',
    id: 1,
  },
  {
    name: 'Dagan',
    id: 2,
  },
];
