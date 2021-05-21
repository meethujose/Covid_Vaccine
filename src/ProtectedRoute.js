import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute(props) {
  const isAuthenticated = useSelector((state) => state.isAuth);
 
  if (isAuthenticated.isAuth === true) {
    console.log("route",props);
    return <Route {...props}>{props.children}</Route>;
  } else {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            from: props.location,
          },
        }}
      />
    );
  }
}
