import React, { useState, useLayoutEffect } from "react";
import "./SignIn.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import { isAuth } from "../../store/isAuthenticated";
import { useHistory } from "react-router-dom";

export default function SignIn() {
  const history = useHistory();
  const auth = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();
  const [loginStatus, setLoginStatus] = useState(null);
  const [mount, setMount] = useState(false);

  useLayoutEffect(() => {
    if (auth.isAuth === true) {
      setLoginStatus(<h3>Login Success !!!</h3>);
      setTimeout(() => {
        history.push("/");
      }, 1000);
    }
    return () => {
      setMount(false);
    };
  }, [mount]);

  const getToken = (event) => {
    event.preventDefault();
    setLoginStatus(<div className="loader"></div>);
    const credentials = {
      username: event.target[0].value,
      password: event.target[1].value,
    };
    const url = "/api/token/";
    axios.post(url, credentials, { timeout: 5000 }).then(
      (response) => {
        console.log('login response', response.data);
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        dispatch(isAuth());
        setMount(true);
      },
      (error) => {
        try {
          switch (error.response.status) {
            case 400:
              setLoginStatus(<h3>Please check your credentials</h3>);
              break;
            case 401:
              setLoginStatus(<h3>Invalid User</h3>);
              break;
          }
        } catch (err) {
          setLoginStatus(<h3>Can't Reach Server</h3>);
        }
      }
    );
  };
  return (
    <div className="wrapper">
      <div className="container">
        <h1>Welcome</h1>

        <form onSubmit={getToken} className="form" method="post">
          <input
            name="username"
            type="text"
            placeholder="Username"
            autoComplete="username"
            required
            autoFocus="true"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="password"
            required
          />
          <button type="submit">Login</button>
        </form>
        {loginStatus ? loginStatus : null}
      </div>
      <ul className="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
