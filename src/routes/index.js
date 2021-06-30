import React, { } from "react";
import { Route, Switch } from "react-router-dom";

const Home = React.lazy(() => import('../pages/home'));
const Country = React.lazy(() => import('../pages/countryDetails'));

const AppRoutes = [
  { path: "/country/:id", exact: true, component: Country },
  { path: "/", component: Home },
];

const Routes = () => (
    <Switch>
      {AppRoutes.map((item) =>
        <Route {...item} key={item.path} />
      )}
    </Switch>
);

export default Routes;