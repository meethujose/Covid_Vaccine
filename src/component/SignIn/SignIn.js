import React, { useState, useLayoutEffect } from "react";
import "./SignIn.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import { isAuth } from "../../store/isAuthenticated";
import {authToken} from "../../store/token";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
export default function SignIn() {
  const history = useHistory();
  const auth = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();
 
 
  const [loginStatus, setLoginStatus] = useState(null);
  const [mount, setMount] = useState(false);

  useLayoutEffect(() => {
    if (localStorage.getItem("access_token")) {  
      dispatch(isAuth());
      history.replace('/');
      }
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

  const getToken =async (event) => {
    event.preventDefault();
    setLoginStatus(<div className='loader'></div>);
    const credentials = {
      email: event.target[0].value,
      password: event.target[1].value,
    };
    const url = "/api/token/";
  axios.post(url, credentials).then(
     (response)  => {
       console.log(response);
        dispatch(authToken(response.data));
       localStorage.setItem("access_token", response.data.access);
       localStorage.setItem("refresh_token", response.data.refresh);
       var decoded = jwt_decode(response.data.access);
       console.log("decrypted token",decoded);
     
       localStorage.setItem("token_expiry",decoded.exp);
       localStorage.setItem("user_group",decoded.group);
       localStorage.setItem("avatar",decoded.avatar);
       localStorage.setItem("first_name",decoded.first_name);
       localStorage.setItem("last_name",decoded.last_name);
       localStorage.setItem("username",decoded.username);
       localStorage.setItem("user_id",decoded.user_id);

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
              default:(<h3>Some Error Occured..Please wait</h3>);
          }
        } catch (err) {
          console.log(err);
          setLoginStatus(<h3>Can't Reach Server</h3>);
        }
      }
    );
  };
  return (
    <div className='wrapper'>
      <div className='container'>
        <h1>Welcome</h1>

        <form className='SignINform ' onSubmit={getToken} method='post'>
          <input
            name='username'
            type='text'
            placeholder='Username'
            autoComplete='username'
            required
            autoFocus={true}
            className='SignINinput '
          />
          <input
            name='password'
            type='password'
            placeholder='Password'
            autoComplete='password'
            required
            className='SignINinput '
          />
          <button type='submit' className='SignINbutton'>
            Login
          </button>
        </form>
        {loginStatus ? loginStatus : null}
      </div>
      <ul className='bg-bubbles'>
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
