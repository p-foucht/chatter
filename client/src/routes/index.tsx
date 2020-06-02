import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Meeting from '../scenes/Meeting';

export const routes = {
  HOME: '/',
  MEETING: '/meeting',
};

const Routes = () => (
  <Router>
    <Switch>
      <Route path={routes.HOME} exact>
        <Meeting />
      </Route>
      <Route path={routes.MEETING} exact>
        <Meeting />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
