import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import Meeting from "../scenes/Meeting";
import Home from "../scenes/Home/Home";
import Auth from "../scenes/Auth";
import { useAuth } from "../providers/AuthProvider";

export const routes = {
  HOME: "/",
  MEETING: "/meeting",
  AUTH: "/:mode",
};

const protectedRoutes = (
  <Switch>
    <Redirect strict from="/signup" to="/" />
    <Redirect strict from="/login" to="/" />
    <Route path={routes.MEETING} exact>
      <Meeting />
    </Route>
    <Route path={routes.HOME}>
      <Home />
    </Route>
  </Switch>
);

const unprotectedRoutes = (
  <Switch>
    <Route path={routes.AUTH} exact>
      <Auth />
    </Route>
    <Redirect to="/signup" />
  </Switch>
);

const Routes = () => {
  const { token } = useAuth();

  return <Router>{token ? protectedRoutes : unprotectedRoutes}</Router>;
};

export default Routes;
