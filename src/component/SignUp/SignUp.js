import React, { useState, useEffect } from "react";
import {useParams } from "react-router-dom";
import "./SignUp.css";
import axios from '../../axios'


export default function SignUp() {
  const string = useParams().string
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [confirmedPasswordStyle, setConfirmedPasswordStyle] = useState(null);
  const [submitButtonStatus, setSubmitButtonStatus] = useState(true)
  const [loginStatus, setLoginStatus] = useState(null);


  useEffect(()=>{
    axios.post("api/retrieveuserid/", {
                token: string
              })
              .then(function (response) {
                console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", response.data.email);
                setEmail(response.data.email)
                setName(response.data.first_name + " " + response.data.last_name)
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
  });
  const passwordHandler = (event) => {
    console.log(event.target.value)
    setPassword(event.target.value)
    console.log(password)
  }
  const passwordConfirmHandler = (event) => {
    setConfirmedPasswordStyle({borderBlockColor:"red"});
    setSubmitButtonStatus(true)
    setConfirmedPassword(event.target.value)
    if (event.target.value === password) {
      setConfirmedPasswordStyle(null)
      setSubmitButtonStatus(false)
    }
  }
  const signUpHandler = (event) => {
    event.preventDefault();
    setLoginStatus(<div className="loader"></div>);

    const data = {
      "email": email,
      "password": password
        }
    axios.post("api/usercreate/",data)
    .then((response) => {
      console.log(response);
      setLoginStatus(<h3>User Created Successfully !!!</h3>);
      window.location = '/login'


    }, (error) => {
      console.log(error);
      setLoginStatus(<h3>Invalid or Expired link !!!</h3>);
    });
  }
  return (
    <div className="wrapper">
      <div className="container">
        <h1>Welcome {name}</h1>

        <form className="formSignUp" method="post" onSubmit={signUpHandler}>
          <input
            name="username"
            type="text"
            placeholder={email}
            disabled="disabled"
            className="formSignUpinput "
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange = {passwordHandler}
            className="formSignUpinput "
          />
          <input
            name="password"
            type="password"
            placeholder="Confirm Password"
            required
            className="formSignUpinput "
            style = {confirmedPasswordStyle}
            onChange = {passwordConfirmHandler}
          />
          <button type="submit" className="formSignUpbutton" disabled={submitButtonStatus}>Sign Up</button>
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

  
