/* eslint-disable no-duplicate-imports */
import { renderHook } from '@testing-library/react-hooks';
import type { RenderHookResult } from '@testing-library/react-hooks';

import useParams from './use-params';

jest.mock('../settings');

jest.mock('../location');

describe('hooks/useParam()', () => {
  let Hook: RenderHookResult<unknown, Record<string, string>>;

  beforeEach(() => {
    Hook = renderHook<unknown, Record<string, string>>(() => useParams());
  });

  it('should return url parameters + query string', () => {
    const { result } = Hook;

    const expected = { type: 'active', filterBy: 'events', orderBy: 'date' };

    expect(result.current).toEqual(expected);
  });
});
