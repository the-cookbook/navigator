import type { Method, Route, Parameters, QueryStrings, Navigator, MountNavigation } from '../contracts';
import toArray from '../utils/to-array';
import settings from '../settings';

import mountRoutePath from './mount-route-path';

const mountNavigation: MountNavigation = (path: string, queryStrings: QueryStrings, replace: boolean) => (
  params: Parameters = {},
  method: Method = 'push',
): void => {
  const mountedPath = mountRoutePath(path, params, queryStrings);

  if (!mountedPath) {
    return null;
  }

  if (replace || method === 'replace') {
    return settings.history.replace(mountedPath);
  }

  settings.history.push(mountedPath);
};

const navigator = (routes: Route[]): Navigator =>
  routes.reduce((acc: Navigator, { name, path, queryStrings = [], replace = false }: Route) => {
    acc[name] = mountNavigation(toArray(path)[0] as string, queryStrings, replace);

    return acc;
  }, {});

export default navigator;
