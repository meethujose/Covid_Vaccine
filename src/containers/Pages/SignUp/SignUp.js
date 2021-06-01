import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { useParams, useHistory } from "react-router-dom";

import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import { isAuth, isNotAuth } from "../../../store/isAuthenticated";
import { addUserDetails } from "../../../store/userDetails";
// import { Redirect, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Loader from "../../../component/utility/loader";
import { Form, Button } from "react-bootstrap";
import backGroundImage from "../../../assets/images/bg_image.png";
import ExpiredLink from "../ExpiredLink/ExpiredLink";

export default function SignUp() {
  const string = useParams().string;

  const [DOMComponent, setDOMComponent] = useState(<Loader />);
  const [userDetails, setuserDetails] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [passwordDidMatched, setPasswordDidMatched] = useState(false);
  const [waitForAxios, setWaitForAxios] = useState(false);
  const [axiosMessage, setaxiosMessage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const history = useHistory()
  // let DOMComponent = <Loader />;

  useEffect(() => {
    const url = "userapi/activateuser/" + string;
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        console.log("from signup success", response.data);
        console.log('use effect worked ')
        setuserDetails(response.data);
      })
      .catch((error) => {
        console.log("from signup error");
        setDOMComponent(<ExpiredLink />);
      });
  }, []);

  const passwordFormSubmitHandler = (event) => {
    event.preventDefault();

    console.log(event.target[1].value);
    setWaitForAxios(true);

    const url = "userapi/activateuser/" + string;
    console.log(url);
    axios
      .post(url, {
        password: event.target[1].value,
      })
      .then((response) => {
        console.log("from signup post success", response.data);
        setaxiosMessage(<p class="text-success">User acivated successfully</p>)
        setWaitForAxios(false)
        setProcessing(true)
        setTimeout(function(){
          history.push('/signin') 
       }, 2000);
      })
      .catch((error) => {
        console.log("from signup post error");
        setDOMComponent(<ExpiredLink />);
      });
  };
  const DOMConentToBeRendered = (
    <>
      <div className='homepageBackgroundContainer'>
        <div className='backgroundPanel active'>
          <img
            data-src='./bg_image.png'
            className='backgroundImage'
            src={backGroundImage}
          />
          <div className='imageTitle'>
            <div className='title'>
              <span className='titlespan'>
                COVID DATABASE FOR LULU GROUP INTERNATIONAL
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='signInContainer'>
        <div className='signinform'>
          <div className='mobiletitle'>
            COVID DATABASE FOR LULU GROUP INTERNATIONAL
          </div>

          {waitForAxios ? (
            <>
            <h1 class="display-6">Please wait...</h1>
            <Loader />
            </>
          ) : (
            <>
              <blockquote className='blockquote text-center'>
                <p className='mb-0'>
                  Welcome {userDetails ? userDetails.invitee : null} !
                </p>
                <p className='mb-0'>
                  You have been invited by{" "}
                  {userDetails ? userDetails.inviter : null} to the COVID
                  Database management system
                </p>
                <p className='mb-0'>Please signup with the below form !</p>
                <p></p>
                <footer className='blockquote-footer'>
                  The link will expire on{" "}
                  {userDetails ? userDetails.invite_expiry_date : null}
                </footer>
              </blockquote>

              <form method='post' onSubmit={passwordFormSubmitHandler}>
                <input
                  className='form-control'
                  type='email'
                  placeholder={userDetails ? userDetails.email : null}
                  readOnly
                />
                <input
                readOnly = {processing}

                  onChange={(event) => {

                    setNewPassword(event.target.value);
                    event.target.value === confirmNewPassword
                      ? setPasswordDidMatched(true)
                      : setPasswordDidMatched(false);
                  }}
                  className='form-control'
                  type='password'
                  placeholder='New Password'
                  required
                />
                <input
                readOnly = {processing}

                  onChange={(event) => {
                    setConfirmNewPassword(event.target.value);
                    newPassword === event.target.value
                      ? setPasswordDidMatched(true)
                      : setPasswordDidMatched(false);
                  }}
                  className='form-control'
                  type='password'
                  placeholder='Confirm Password'
                  required
                />
                {axiosMessage}
                <button
                  disabled={!passwordDidMatched}
                  style={{ marginTop: "30px" }}
                  type='submit'
                  className='btn btn-danger'>
                  Submit
                </button>
              </form>
            </>
          )}

          <div className='banner'>Powered by ABACI Technologies Pvt Ltd.</div>
        </div>
      </div>
    </>
  );

  return <>{userDetails ? DOMConentToBeRendered : DOMComponent}</>;
}
