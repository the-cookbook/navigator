import type { LocationDescriptorObject, Search, Pathname } from 'history';

import settings from '../settings';
import type { State } from '../contracts';

const createLocationDescriptor = <S extends State = State>(
  pathname: Pathname,
  search: Search = '',
): LocationDescriptorObject<S> => ({
  pathname,
  search,
  state: ({
    from: settings.history.location,
  } as unknown) as S,
});

export default createLocationDescriptor;
