/* eslint-disable filenames/match-exported */
import navigator from './navigator';
import location from './location';
import useParams from './use-params';
import useLocation from './use-location';
import setup from './setup';
import type { Route, Method } from './contracts';

export type { Route, Method };
export { setup, location, useParams, useLocation };
export default navigator;
