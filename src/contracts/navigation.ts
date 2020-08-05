import type { Method } from './history';
import type { Parameters, QueryStrings } from './route';

/**
 * @global
 * @callback NavigationAction
 * @param {Parameters} [params]
 * @param {Method} [method]
 */
type NavigationAction = (params?: Parameters, method?: Method) => void;

/**
 * @global
 * @callback MountNavigation
 * @param {string} path
 * @param {QueryStrings} queryStrings
 * @param {boolean} replace
 * @returns {NavigationAction}
 */
type MountNavigation = (path: string, queryStrings: QueryStrings, replace: boolean) => NavigationAction;

/**
 * @global
 * @typedef {Object.<string, NavigationAction>} Navigator
 */
type Navigator = Record<string, NavigationAction>;

export type { Parameters, QueryStrings, Navigator, MountNavigation, NavigationAction };
