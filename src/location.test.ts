import type { Route, Parameters, QueryStrings } from './contracts';
import settings from './settings';
import location from './location';
// eslint-disable-next-line jest/no-mocks-import
import routes from './__mocks__/routes';
import createLocationDescriptor from './core/create-location-descriptor';

jest.mock('./settings');

describe('location', () => {
  describe('location.go()', () => {
    let spyOnPush: jest.SpyInstance;
    let spyOnWindow: jest.SpyInstance;
    let spyOnWindowOpen: jest.SpyInstance;

    beforeEach(() => {
      spyOnPush = jest.spyOn(settings.history, 'push');
      spyOnWindow = jest.spyOn(global, 'window', 'get');
      spyOnWindowOpen = jest.fn();

      spyOnWindow.mockImplementation(() => ({
        open: spyOnWindowOpen,
        location: {
          href: 'http://localhost/',
        },
      }));
    });

    afterEach(() => {
      spyOnPush.mockRestore();
      spyOnWindow.mockRestore();
      spyOnWindowOpen.mockRestore();
    });

    it('should use "history" for local paths', () => {
      const paths = ['/profile', 'http://localhost/profile/1'];

      const locations = paths.map((path) => createLocationDescriptor(path.replace('http://localhost', ''), ''));

      paths.forEach((path, idx) => {
        location.go(path);
        expect(spyOnPush).toHaveBeenLastCalledWith(locations[idx]);
      });
    });

    it('should use "window" for external addresses', () => {
      const paths = ['www.just-for-fun.com', 'http://www.google.com', 'http://www.github.com'];

      paths.forEach((path, idx) => {
        location.go(path);

        expect(spyOnWindowOpen).toHaveBeenLastCalledWith(paths[idx], undefined);
      });
    });

    it('should work with encoded url', () => {
      const paths = ['https://github.com/the-cookbook', 'http://www.google.com', 'http://www.github.com'];
      const encodedPaths = paths.map((path) => encodeURIComponent(path));

      encodedPaths.forEach((path, idx) => {
        location.go(path);

        expect(spyOnWindowOpen).toHaveBeenLastCalledWith(paths[idx], undefined);
      });
    });
  });

  describe('location.params', () => {
    it('should return url parameters', () => {
      expect(location.params).toEqual({ type: 'active', id: '2' });
    });
  });

  describe('location.current', () => {
    it('should return current route', () => {
      expect(location.current).toEqual(routes.find((route) => route.name === 'subscriptions'));
    });
  });

  describe('location.queryStrings', () => {
    it('should return query string', () => {
      expect(location.queryStrings).toEqual({ filterBy: 'events', orderBy: 'date' });
    });
  });

  describe('location.findRouteByPath()', () => {
    const expectations: Record<string, Route | undefined> = {
      '/': routes.find((route) => route.name === 'home'),
      '/profile': routes.find((route) => route.name === 'profile'),
      '/profile/2': routes.find((route) => route.name === 'profile'),
      '/subscriptions': undefined,
      '/subscriptions/deactivated': routes.find((route) => route.name === 'subscriptions'),
      '/non-existent-route': undefined,
    };

    Object.keys(expectations).forEach((path) => {
      it(`expect path "${path}" be match route "${expectations[path]?.name}"`, () => {
        expect(location.findRouteByPath('/profile')).toEqual(routes.find((route) => route.name === 'profile'));
      });
    });
  });

  describe('location.compilePath()', () => {
    interface PathParams {
      name: string;
      params?: Parameters;
      queryStrings?: QueryStrings;
    }

    const expectations: Record<string, PathParams> = {
      '/': {
        name: 'home',
      },
      '/profile': {
        name: 'profile',
      },
      '/profile/2': {
        name: 'profile',
        params: { id: 2 },
      },
      '/profile/2?page=1': {
        name: 'profile',
        params: { id: 2, page: 1 },
        queryStrings: [':page'],
      },
      '/subscriptions/active': {
        name: 'subscriptions',
      },
      undefined: {
        name: 'non-existent-route-name',
      },
    };

    Object.keys(expectations).forEach((path) => {
      it(`expect route "${expectations[path]?.name}" to be compiled as "${path}"`, () => {
        expect(
          location
            .compilePath(expectations[path].name, expectations[path]?.params, expectations[path]?.queryStrings)
            ?.toString(),
        ).toEqual(path === 'undefined' ? undefined : path);
      });
    });
  });
});
