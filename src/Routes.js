import React, { useState, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Loader from "./component/utility/loader";
import PrivateRoute from "./PrivateRoute";
import Error404 from "./containers/Pages/Error404/Error404";
import { PUBLIC_ROUTE, PRIVATE_ROUTE } from "./route.constants";
import Admin from './component/Admin/Admin'
import TestPage from "./containers/Pages/TestPage/TestPage";
import Settings from './containers/Pages/Settings/Settings';
import TestResult from './containers/Pages/TestResult/TestResult';
const publicRoutes = [
  {
    path: PUBLIC_ROUTE.LANDING,
    exact: true,
    component: lazy(() => import("./containers/Pages/SignIn/SignIn")),
  },
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() => import("./containers/Pages/SignIn/SignIn")),
  },
];

const privateRoutes = [
  {
    path: PRIVATE_ROUTE.HOME,
    exact: true,
    component: lazy(() => import("./containers/Pages/Home/Home")),
  },
];

export default function Routes() {
  const [userArray, setUserArray] = useState([]);
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Switch>
          {publicRoutes.map((route, index) => {
            return (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            );
          })}
          {privateRoutes.map((route, index) => {
            return (
              <Route key={index} path={route.path} exact={route.exact}>
                <PrivateRoute>
                  <route.component />
                </PrivateRoute>
              </Route>
            );
          })}

          <Route path='/test'>
            <TestPage />
          </Route>
          <Route path='/settings'>
            <Settings />
          </Route>
          <Route path='/testresult'>
            <TestResult />
          </Route>


          <Route path='*'>
            <Error404 />
          </Route>
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
}
