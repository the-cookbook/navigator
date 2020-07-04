import type { Method } from './history';
import type { Parameters, QueryStrings } from './route';

type NavigationAction = (params?: Parameters, method?: Method) => void;

type MountNavigation = (path: string, queryStrings: QueryStrings, replace: boolean) => NavigationAction;

type Navigator = Record<string, NavigationAction>;

export type { Parameters, QueryStrings, Navigator, MountNavigation, NavigationAction };
