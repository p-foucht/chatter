import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Meeting from "../scenes/Meeting";
import Home from "../scenes/Home/Home";

export const routes = {
  HOME: "/",
  MEETING: "/meeting",
};

const Routes = () => (
  <Router>
    <Switch>
      <Route path={routes.HOME} exact>
        <Home />
      </Route>
      <Route path={routes.MEETING} exact>
        <Meeting />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
