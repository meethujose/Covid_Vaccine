import React, { useState, useEffect } from "react";
import "./SignIn.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import { isAuth, isNotAuth } from "../../../store/isAuthenticated";
import { addUserDetails } from "../../../store/userDetails";
import { Redirect, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Loader from "../../../component/utility/loader";

export default function SignIn(props) {
  // Storing the history location to redirect after login
  let locationAfterSignIn = "";
  try {
    locationAfterSignIn = props.location.state.from.pathname;
    if (locationAfterSignIn === "/signin") {
      locationAfterSignIn = "/home";
    }
  } catch (err) {
    locationAfterSignIn = "/home";
  }
  console.log('signin triggered', locationAfterSignIn)

  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.isAuth.isAuth);
  console.log('isAuthenticated',isAuthenticated)
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
          // return response.data.access;
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

  const getToken = async (event) => {
    event.preventDefault();
    const credentials = {
      email: event.target[0].value,
      password: event.target[1].value,
    };
    const url = "/api/token/";
    axios
      .post(url, credentials)
      .then((response) => {
        console.log(response);
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        dispatch(isAuth(response.data.access));

        // var decoded = jwt_decode(response.data.access);
        // console.log(decoded)
        // localStorage.setItem("token_expiry", decoded.exp);
        // localStorage.setItem("is_admin", decoded.is_admin);
        // localStorage.setItem("first_name", decoded.first_name);
        // localStorage.setItem("last_name", decoded.last_name);
        // dispatch(isAuth(response.data.access));
        // dispatch(addUserDetails(decoded));
        
        history.push(locationAfterSignIn);
      })
      .catch((error) => {
        dispatch(isNotAuth());
      });
  };

  let DOMComponent = <Loader />;
  if (isAuthenticated === true) {
    DOMComponent = (
      <Redirect
        to={{
          pathname: locationAfterSignIn,
          state: {
            from: props.location,
          },
        }}
      />
    );
  } else if (isAuthenticated === false) {
    DOMComponent = (
      <div className='wrapper'>
        <div className='signcontainer'>
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
  return ( <>
    {DOMComponent}
    </>);
}
