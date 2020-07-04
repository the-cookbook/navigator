import React from 'react';

import location from '../location';
import settings from '../settings';

const mount = (): Record<string, string> => ({ ...location.params, ...location.queryStrings });

const useParams = (): Record<string, string> => {
  const [state, updateParams] = React.useState<Record<string, string>>(mount());

  React.useEffect(() => {
    const unlisten = settings.history.listen(() => {
      updateParams(mount());
    });

    return () => {
      unlisten();
    };
  }, []);

  return state;
};

export default useParams;
