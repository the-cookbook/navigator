import type { LocationDescriptorObject } from 'history';

import createLocationDescriptor from './create-location-descriptor';

jest.mock('../settings');

describe('core/createLocationDescriptor()', () => {
  it('should create expected location descriptor shape', () => {
    const expected: LocationDescriptorObject = {
      pathname: '/pages/hallo-welt',
      search: '',
      state: {
        from: {
          hash: '',
          pathname: '/subscriptions/active/2',
          search: '?filterBy=events&orderBy=date',
          state: undefined,
        },
      },
    };

    const generated = createLocationDescriptor('/pages/hallo-welt');

    expect(generated).toStrictEqual(expected);
  });

  it('should contain search property', () => {
    const expected: LocationDescriptorObject = {
      pathname: '/pages/hallo-welt',
      search: '?page=1',
      state: {
        from: {
          hash: '',
          pathname: '/subscriptions/active/2',
          search: '?filterBy=events&orderBy=date',
          state: undefined,
        },
      },
    };

    const generated = createLocationDescriptor('/pages/hallo-welt', '?page=1');

    expect(generated).toStrictEqual(expected);
  });
});
