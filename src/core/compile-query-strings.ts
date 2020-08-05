import * as pathToRegexp from 'path-to-regexp';

import parse from '../utils/parse';
import is from '../utils/is';
import type { Parameters, QueryStrings } from '../contracts';

/**
 * @example
 * const queryStrings = [':page', ':orderBy']
 * const params = { page: 1, orderBy: 'date' };
 * compileQueryStrings(queryStrings, params); // returns '?page=1&orderBy=date''
 */
const compileQueryStrings = (queryStrings: QueryStrings = [], params: Parameters = {}): string => {
  const queries = queryStrings
    .reduce((acc, query) => {
      const key = parse.toCamelCase(query.replace(/[^a-zA-Z0-9-_]/g, ''));
      const value = pathToRegexp.compile(`:${key}?`)(parse.objectKeysCase(params));

      if (!is.nullOrUndefined(value) && value.toString().trim() !== '') {
        acc.push(`${key}=${value}`);
      }

      return acc;
    }, [] as string[])
    .join('&');

  return queries ? `?${queries}` : '';
};

export default compileQueryStrings;
