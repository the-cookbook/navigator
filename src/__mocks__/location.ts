import routes from './routes';

const route = routes.find((r) => r.name === 'profile');

const location = {
  go(): void {
    return null;
  },
  current: route,
  params: { type: 'active' },
  queryStrings: { filterBy: 'events', orderBy: 'date' },
};

export default location;
