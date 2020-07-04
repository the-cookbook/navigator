import React from 'react';
import { Setup as NavigatorSetup } from '@cookbook/navigator';

import Router from '../../services/router';
import routes from '../../services/router/routes';
import history from '../../services/history';

import Menu from '../shared/menu';

const Root: React.FunctionComponent<Record<string, unknown>> = () => {
  NavigatorSetup({
    history,
    routes,
  });

  return (
    <React.Fragment>
      <React.Suspense fallback={<div>loading...</div>}>
        <Menu />
        <Router />
      </React.Suspense>
    </React.Fragment>
  );
};

export default Root;
