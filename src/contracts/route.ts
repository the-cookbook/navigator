/**
 * @global
 * @typedef {Object.<string, string | number | boolean>} Parameters
 */
type Parameters = Record<string, string | number | boolean>;

/**
 * @global
 * @typedef {string[]} QueryStrings
 */
type QueryStrings = string[];

/**
 * @global
 * @typedef {object} Route
 * @property {string} name
 * @property {string|string[]} path=
 * @property {QueryStrings=} queryStrings
 * @property {boolean=} replace
 */
type Route<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  name: string;
  path: string | string[];
  queryStrings?: QueryStrings;
  replace?: boolean;
};

export type { Parameters, QueryStrings, Route };
