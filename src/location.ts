import { LocationDescriptorObject, Search } from 'history';
import { pathToRegexp, match, MatchResult } from 'path-to-regexp';

import type { Route, Parameters, QueryStrings } from './contracts';
import createLocationDescriptor from './core/create-location-descriptor';
import mountRoutePath from './core/mount-route-path';
import settings from './settings';
import is from './utils/is';
import parse from './utils/parse';
import toArray from './utils/to-array';

const location = {
  go: (url: string, target?: '_self' | '_blank' | '_parent' | '_top'): void => {
    const decodedUrl = decodeURIComponent(url);

    if (is.externalUrl(decodedUrl)) {
      window.open(decodedUrl, target);

      return;
    }

    let sanitizedUrl = decodedUrl.replace(/^.*\/\/[^/]+/, '');
    const search: Search = /\?.+/g.exec(sanitizedUrl)?.[0] ?? '';

    sanitizedUrl = sanitizedUrl.replace(search, '');

    settings.history.push(createLocationDescriptor(sanitizedUrl, search));
  },
  findRouteByPath(path: string): Route | undefined {
    return settings.routes.find((route) => Boolean(pathToRegexp(route.path).exec(path)));
  },
  compilePath(
    routeName: string,
    params: Parameters = {},
    queryStrings: QueryStrings = [],
  ): (LocationDescriptorObject & { toString: () => string }) | undefined {
    const { path } = settings.routes.find((route) => route.name === routeName) ?? {};

    if (!path) {
      return;
    }

    const mountedRoute = mountRoutePath(toArray(path)[0] as string, params, queryStrings);

    const toString = (): string => {
      if (!mountedRoute) {
        return '';
      }

      return `${mountedRoute.pathname}${mountedRoute.search}`;
    };

    return {
      ...mountedRoute,
      toString,
    };
  },
  get current(): Route {
    return this.findRouteByPath(settings.history.location.pathname);
  },
  /* eslint-disable @typescript-eslint/indent */
  get params(): Record<string, string> {
    const route = this.current;

    const { params = {} } = match(route.path, { decode: decodeURIComponent })(
      settings.history.location.pathname,
    ) as MatchResult<Record<string, string>>;

    return params;
  },
  /* eslint-enable */
  get queryStrings(): Record<string, string> {
    return parse.queryStringToObject(settings.history.location.search);
  },
};

export default location;
