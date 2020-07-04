type Parameters = Record<string, string | number | boolean>;

type QueryStrings = string[];

type Route<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  name: string;
  path: string | string[];
  queryStrings?: QueryStrings;
  replace?: boolean;
};

export type { Parameters, QueryStrings, Route };
