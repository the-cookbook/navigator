import * as pathToRegexp from 'path-to-regexp';

import toArray from '../utils/to-array';
import settings from '../settings';
// eslint-disable-next-line jest/no-mocks-import
import routes from '../__mocks__/routes';
import type { Parameters } from '../contracts';

import navigatorCore from './navigator';

jest.mock('../settings');

const createLocation = (path: string, params: Parameters, search = '') => ({
  pathname: pathToRegexp.compile(path)(params),
  search,
  state: {
    from: {
      hash: '',
      pathname: '/subscriptions/active/2',
      search: '?filterBy=events&orderBy=date',
      state: undefined as unknown,
    },
  },
});

describe('core/navigator', () => {
  const navigator = navigatorCore(routes);

  it('should create navigation for all available routes', () => {
    const navigationRoutes = Object.keys(navigator);

    expect(routes.every(({ name }) => navigationRoutes.includes(name))).toBe(true);
  });

  describe('history.push()', () => {
    let spyOnPush: jest.SpyInstance;

    beforeEach(() => {
      spyOnPush = jest.spyOn(settings.history, 'push');
    });

    afterEach(() => {
      spyOnPush.mockRestore();
    });

    it('is called by default', () => {
      const params = {};
      const route = routes.find(({ replace }) => !replace);

      navigator[route.name](params);

      const { 0: { 0: generatedLocation } = { 0: {} } } = spyOnPush.mock.calls;

      const expectedLocation = createLocation(toArray(route.path)[0] as string, params);

      expect(spyOnPush).toHaveBeenCalled();
      expect(generatedLocation).toStrictEqual(expectedLocation);
    });

    it('navigates with arguments', () => {
      const searchFor = ':';

      // find route that contains parameter definition
      const route = routes.find((r) => toArray(r.path).some((p: string) => p.includes(searchFor)));
      const path = toArray(route.path).find((p: string) => p.includes(searchFor)) as string;
      const parameter = path
        .split('/')
        .find((p) => p.includes(searchFor))
        .replace(/[:?]/g, '');

      const params = {
        [parameter]: 'test',
      };

      navigator[route.name](params);

      const {
        0: { 0: generatedLocation },
      } = spyOnPush.mock.calls;

      const expectedLocation = createLocation(path, params);

      expect(spyOnPush).toHaveBeenCalled();
      expect(generatedLocation).toStrictEqual(expectedLocation);
    });

    it('navigates with query string', () => {
      const route = routes.find((r) => r.queryStrings);

      if (!route) {
        return expect(true).toBe(true);
      }

      const [path] = toArray(route.path) as string[];

      const queryString = route.queryStrings[0].replace(/[:?]/, '');

      const params = {
        [queryString]: 'queryStringTest',
      };

      navigator[route.name](params);

      const {
        0: { 0: generatedLocation },
      } = spyOnPush.mock.calls;

      const expectedLocation = createLocation(path, params, `?${queryString}=${params[queryString]}`);

      expect(spyOnPush).toHaveBeenCalled();
      expect(generatedLocation).toStrictEqual(expectedLocation);
    });
  });

  describe('history.replace()', () => {
    let spyOnReplace: jest.SpyInstance;

    beforeEach(() => {
      spyOnReplace = jest.spyOn(settings.history, 'replace');
    });

    afterEach(() => {
      spyOnReplace.mockRestore();
    });

    it('navigates through route definition', () => {
      const route = routes.find((r) => r.replace);
      const [path] = toArray(route.path);

      const params = {};

      navigator[route.name](params);

      const {
        0: { 0: generatedLocation },
      } = spyOnReplace.mock.calls;

      const expectedLocation = createLocation(path, params);

      expect(spyOnReplace).toHaveBeenCalled();
      expect(generatedLocation).toStrictEqual(expectedLocation);
    });

    it('is called with arguments', () => {
      const route = routes.find((r) => !r.replace);
      const [path] = toArray(route.path) as string[];

      const params = {};

      navigator[route.name](params, 'replace');

      const {
        0: { 0: generatedLocation },
      } = spyOnReplace.mock.calls || [];

      const expectedLocation = createLocation(path, params);

      expect(spyOnReplace).toHaveBeenCalled();
      expect(generatedLocation).toStrictEqual(expectedLocation);
    });
  });
});
