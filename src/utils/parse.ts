const toKebabCase = (value: string, limiter = '-'): string => {
  if (!value) {
    return '';
  }

  return value
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join(limiter);
};

const toCamelCase = (value: string, lowerCamelCase = true): string => {
  if (!value) {
    return '';
  }

  return value
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x, idx) => {
      if (lowerCamelCase && idx === 0) {
        return x.toLowerCase();
      }

      return x.substr(0, 1).toUpperCase() + x.substr(1);
    })
    .join('');
};

const objectKeysCase = <T extends Record<string, unknown> = Record<string, unknown>>(
  source: T,
  caseModifier: (value: string) => string = toCamelCase,
): T => {
  return Object.keys(source).reduce((list, key) => ({ ...list, [caseModifier(key)]: source[key] }), {} as T);
};

const queryStringToObject = (search: string): Record<string, string> =>
  (search || '')
    .replace(/^\?/g, '')
    .split('&')
    .reduce((acc, query) => {
      const { 0: key, 1: value } = query.split('=');

      if (key) {
        acc[toCamelCase(key)] = decodeURIComponent(value);
      }

      return acc;
    }, {} as Record<string, string>);

export default {
  toKebabCase,
  toCamelCase,
  objectKeysCase,
  queryStringToObject,
};
