type Method = 'push' | 'replace';

/**
 * @global
 * @typedef {Object.<string, string | number | boolean | null | undefined | State>} State
 */
interface State {
  [key: string]: string | number | boolean | null | undefined | State;
}

export { Method, State };
