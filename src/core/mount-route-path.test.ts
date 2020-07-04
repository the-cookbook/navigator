import type { QueryStrings } from '../contracts';

import createLocationDescriptor from './create-location-descriptor';
import mountRoutePath from './mount-route-path';

jest.mock('../settings');

describe('core/mountRoutePath()', () => {
  it('should mount the route path accordingly', () => {
    const path = '/:version/:controller(client|address)/:id';
    const params = {
      version: 'v1',
      id: 46,
      page: 1,
    };
    const queryStrings: QueryStrings = [':page'];

    const routePath = mountRoutePath(path, params, queryStrings);
    const expected = createLocationDescriptor(`/${params.version}/client/${params.id}`, `?page=${params.page}`);

    expect(routePath).toStrictEqual(expected);
  });

  it('should mount the route path even with boolean values', () => {
    const path = '/pull-request/status/:status(false|true)/:id';
    const params = {
      id: 46,
      page: 1,
    };

    const queryStrings: QueryStrings = [':page'];

    const routePath = mountRoutePath(path, params, queryStrings);
    const expected = createLocationDescriptor(`/pull-request/status/false/${params.id}`, `?page=${params.page}`);

    expect(routePath).toStrictEqual(expected);
  });
});
