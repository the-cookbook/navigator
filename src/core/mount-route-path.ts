import * as pathToRegexp from 'path-to-regexp';
import { LocationDescriptorObject } from 'history';

import type { Parameters, QueryStrings } from '../contracts';
import is from '../utils/is';

import createLocationDescriptor from './create-location-descriptor';
import compileQueryStrings from './compile-query-strings';
import getDefaultParamValue from './get-default-param-value';

const mountRoutePath = (
  path: string,
  params: Parameters = {},
  queryStrings: QueryStrings,
): LocationDescriptorObject => {
  const requiredParams = pathToRegexp
    .parse(path)
    .filter((param) => typeof param === 'object')
    .filter((param: pathToRegexp.Key) => param.modifier !== '?');

  const mergedParams = requiredParams.reduce((acc, { name }: pathToRegexp.Key) => {
    acc[name] = params[name] || getDefaultParamValue(name, path);

    return acc;
  }, params);

  const hasRequiredNonMergedParams = requiredParams.some(({ name }: pathToRegexp.Key) =>
    is.nullOrUndefined(mergedParams[name]),
  );

  if (hasRequiredNonMergedParams) {
    return;
  }

  return createLocationDescriptor(pathToRegexp.compile(path)(mergedParams), compileQueryStrings(queryStrings, params));
};

export default mountRoutePath;
