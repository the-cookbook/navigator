type Method = 'push' | 'replace';

interface State {
  [key: string]: string | number | boolean | null | undefined | State;
}

export { Method, State };
