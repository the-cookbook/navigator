/* eslint-disable no-duplicate-imports */
import { renderHook } from '@testing-library/react-hooks';
import type { RenderHookResult } from '@testing-library/react-hooks';

// eslint-disable-next-line jest/no-mocks-import
import routes from '../__mocks__/routes';

import useLocation from './use-location';
import type { Location } from './use-location';

jest.mock('../settings');

jest.mock('../location');

describe('hooks/useLocation()', () => {
  let Hook: RenderHookResult<unknown, Location>;

  beforeEach(() => {
    Hook = renderHook<unknown, Location>(() => useLocation());
  });

  it('should return current route', () => {
    const { result } = Hook;

    const expected = {
      go: (): void => null,
      current: routes.find((r) => r.name === 'profile'),
    };

    expect(JSON.stringify(result.current)).toBe(JSON.stringify(expected));
  });
});
