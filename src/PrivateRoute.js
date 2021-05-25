import React, { useEffect } from "react";
import { Redirect, Route, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "./axios";
import { isAuth, isNotAuth } from "./store/isAuthenticated";
import Loader from "./component/utility/loader";

export default function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = useSelector((state) => state.isAuth.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      const url = "api/token/refresh/";
      axios
        .post(url, {
          refresh: refreshToken,
        })
        .then(function (response) {
          localStorage.setItem("access_token", response.data.access);
          dispatch(isAuth(response.data.access));
        })
        .catch(function (error) {
          dispatch(isNotAuth());
        });
    } else {
      dispatch(isNotAuth());
    }
  }, []);

  let DOMComponent = <Loader />;
  console.log('from private rout', isAuthenticated)
  return (
      <Route
        {...rest}
        render={({ location }) =>
        isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
}