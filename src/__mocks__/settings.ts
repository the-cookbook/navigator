import routes from './routes';

export type UnregisterCallback = () => void;

const settings = {
  history: {
    replace: (...arg: unknown[]): unknown[] => arg,
    push: (...arg: unknown[]): unknown[] => arg,
    listen: (): UnregisterCallback => () => null,
    location: {
      hash: '',
      pathname: '/subscriptions/active/2',
      search: '?filterBy=events&orderBy=date',
      state: undefined as unknown,
    },
  },
  routes,
};

export default settings;
