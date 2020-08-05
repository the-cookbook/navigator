import { History, LocationState } from 'history';

import type { Route } from './contracts';
import parse from './utils/parse';

interface Store {
  history: History<LocationState>;
  routes: Route[];
}

const store: Store = {
  history: {} as History<LocationState>,
  routes: [],
};

const settings = Object.freeze({
  get history() {
    return store.history as History<LocationState>;
  },
  get routes() {
    return store.routes as Route[];
  },
});

const navigatorSetup = ({ history, routes }: Store): void => {
  store.history = history;
  store.routes = routes.map((route) => ({ ...route, name: parse.toCamelCase(route.name) }));
};

export { navigatorSetup };
export default settings;
