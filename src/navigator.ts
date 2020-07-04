import type { Route, Navigator } from './contracts';
import navigator from './core/navigator';
import settings from './settings';

const getAvailableRoutes = (): string =>
  settings.routes.reduce((list, route) => [...list, route.name], [] as Route[]).join(', ');

const shouldUpdate = (actual: Navigator): boolean =>
  !Object.keys(actual).length || Object.keys(actual).length !== Object.keys(settings.routes).length;

export default new Proxy(
  {},
  {
    get(target: Navigator, route: string) {
      if (shouldUpdate(target)) {
        // eslint-disable-next-line no-param-reassign
        target = navigator(settings.routes);
      }

      if (!target[route]) {
        throw new RangeError(
          `\n\nRoute "${route}" is not available in declared routes:\n\n• "${getAvailableRoutes()}"\n`,
        );
      }

      return target[route];
    },
  },
);
