import { Route } from '../contracts';

export default [
  {
    name: 'home',
    path: '/',
    queryStrings: [':page'],
    exact: true,
  },
  {
    name: 'profile',
    path: '/profile/:id?',
    exact: true,
  },
  {
    name: 'search',
    path: '/search/:scope?',
    queryStrings: [':term', ':page'],
    exact: true,
  },
  {
    name: 'subscriptions',
    path: '/subscriptions/:type(active|deactivated)/:id?',
    exact: true,
  },
  {
    name: 'internalServerError',
    path: '/error/internal-server-error',
    exact: true,
    replace: true,
  },
  {
    name: 'notFound',
    path: '(.*)',
    replace: true,
  },
] as Route[];
