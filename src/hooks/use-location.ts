import React from 'react';

import location from '../location';
import settings from '../settings';
import type { Route } from '../contracts';

interface Location {
  go: (url: string, target?: '_self' | '_blank' | '_parent' | '_top') => void;
  current: Route;
}

const mount = (): Location => ({
  go: location.go,
  current: location.current,
});

const useLocation = (): Location => {
  const [state, updateLocation] = React.useState<Location>(mount());

  React.useEffect(() => {
    const unlisten = settings.history.listen(() => {
      updateLocation(mount());
    });

    return () => {
      unlisten();
    };
  }, []);

  return state;
};

export type { Location };
export default useLocation;
