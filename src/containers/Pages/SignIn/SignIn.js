import React, { useState, useEffect } from "react";
import "./SignIn.css";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import { isAuth, isNotAuth } from "../../../store/isAuthenticated";
import { addUserDetails } from "../../../store/userDetails";
import { Redirect, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Loader from "../../../component/utility/loader";
import { Form, Button } from "react-bootstrap";
import backGroundImage from "../../../assets/images/bg_image.png";
export default function SignIn(props) {
  // Storing the history location to redirect after login
  let locationAfterSignIn = "";
  try {
    locationAfterSignIn = props.location.state.from.pathname;
    if (locationAfterSignIn === "/signin") {
      locationAfterSignIn = "/home";
    } else {
      locationAfterSignIn = props.location.state.from.pathname;
    }
  } catch (err) {
    locationAfterSignIn = "/home";
  }
  // console.log("signin triggered", locationAfterSignIn);
  const [forgotPassword, setForgotPassword] = useState(true);
  const [waitForAxiosLogin, setWaitForAxiosLogin] = useState(false);
  const [waitForAxiosForgotPassword, setWaitForAxiosForgotPassword] =
    useState(false);
  const [axiosMessage, setaxiosMessage] = useState({ type : '', message : ''});
  const [otpDidReceived, setotpDidReceived] = useState(false);
  const [passwordDidMatched, setPasswordDidMatched] = useState(false);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [email, setEmail] = useState(null)
  const styles = useSpring({
    // width: forgotPassword ? "100%" : 0,
    height: forgotPassword ? 250 : 0,
    scale: forgotPassword ? 1 : 0,
    opacity: forgotPassword ? 1 : 0,
    // transform: "translate3d(0px,0,0) scale(1) rotateX(0deg)",
    // backgroundColor: isHovered ? "white" : "green",
    // borderRadius: 10,
  });
  const history = useHistory();
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
          console.log("response",response.data);
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

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setWaitForAxiosLogin(true);
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
        console.log("login error", error);
        
        try {
          setaxiosMessage({ type : "text-danger", message : error.response.data.detail });
        }
        catch {
          setaxiosMessage({ type : "text-danger", message : "Error occured, please try again !!!"});
        }
        
        setWaitForAxiosLogin(false);
        dispatch(isNotAuth());
      });
  };


  const emailIdGetHandler = async (event) => {
    event.preventDefault();
    setWaitForAxiosForgotPassword(true)
    const url = "userapi/forgotpassword/" + event.target[0].value;
    setEmail(event.target[0].value)
    axios
        .get(url)
        .then((response) => {
          console.log(response.data.message);
          try {
            setaxiosMessage({ type : "text-success", message : response.data.message });
          }
          catch {
            setaxiosMessage({ type : "text-danger", message : "Error occured, please try again !!!"});
          }
          
          setotpDidReceived(true);
          setWaitForAxiosForgotPassword(false);
          
        })
        .catch((error) => {
          try {
            setaxiosMessage({ type : "text-danger", message : error.response.data.error});
          }
          catch {
            setaxiosMessage({ type : "text-danger", message : "Error occured, please try again !!!"});
          }
          console.log(error.response.data.error);
          setWaitForAxiosForgotPassword(false);
        });
  }
  const passwordFormSubmitHandler = async (event) => {
    
    event.preventDefault();
    setWaitForAxiosForgotPassword(true);
    const url = "userapi/forgotpassword/" + email;
    const otp = {
        retrieve_password_otp: event.target[0].value,
        password: event.target[1].value,
      };
      axios
        .post(url, otp)
        .then((response) => {
          console.log(response.data.Success);
          setaxiosMessage({ type : "text-success", message : response.data.Success })
          const tempState = forgotPassword;
          setForgotPassword(!tempState);
          setotpDidReceived(false);

          // setaxiosMessage(response.data.message);
          // setotpDidReceived(true);
          // setWaitForAxiosForgotPassword(false);
        })
        .catch((error) => {
          try {
            setaxiosMessage({ type : "text-danger", message : error.response.data.error})
          }
          catch {
            setaxiosMessage({ type : "text-danger", message : 'Error, Please try again !!!'})
          }
          
          // setaxiosMessage(error.response.data.error);
          // setWaitForAxiosForgotPassword(false);
        });
    } 

    //     localStorage.setItem("access_token", response.data.access);
    //     localStorage.setItem("refresh_token", response.data.refresh);
    //     dispatch(isAuth(response.data.access));

    //     // var decoded = jwt_decode(response.data.access);
    //     // console.log(decoded)
    //     // localStorage.setItem("token_expiry", decoded.exp);
    //     // localStorage.setItem("is_admin", decoded.is_admin);
    //     // localStorage.setItem("first_name", decoded.first_name);
    //     // localStorage.setItem("last_name", decoded.last_name);
    //     // dispatch(isAuth(response.data.access));
    //     // dispatch(addUserDetails(decoded));

    //     history.push(locationAfterSignIn);
    //   })
    //   .catch((error) => {
    //     dispatch(isNotAuth());
    //   });

  // const newPasswordChangeHandler = (event) => {
  //   setNewPassword(event.target.value)
  //   console.log(newPassword)
  //   newPassword === confirmNewPassword ? setPasswordDidMatched(true) : setPasswordDidMatched(false)
  // };
  // const confirmPasswordChangeHandler = (event) => {
  //   setConfirmNewPassword(event.target.value)
  //   console.log(confirmNewPassword)
  // };
  const forgotPasswordHandler = () => {
    const tempState = forgotPassword;
    setForgotPassword(!tempState);
    newPassword === confirmNewPassword
      ? setPasswordDidMatched(true)
      : setPasswordDidMatched(false);
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
            {waitForAxiosLogin ? (
              <Loader />
            ) : (
              <animated.div style={styles}>
                <form onSubmit={formSubmitHandler} method='post'>
                  <input
                    className='form-control'
                    type='email'
                    placeholder='Email address'
                    required
                    name='email'
                  />
                  <label className='text-muted'>
                    We'll never share your email with anyone else.
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Password'
                    required
                    password="password"
                  />
                  <p className={axiosMessage.type}>{axiosMessage.message}</p>
                  <button
                    style={{ marginTop: "30px" }}
                    type='submit'
                    className='btn btn-primary'>
                    Submit
                  </button>
                </form>
              </animated.div>
            )}
            { forgotPassword
            ?
            null
            :
            (
            

              !otpDidReceived
              ?
              (waitForAxiosForgotPassword ? <Loader/> :
              (<form onSubmit = {emailIdGetHandler} >
                <input
                      className='form-control'
                      type='email'
                      placeholder='Email address'
                      required
                    />
                
                    <p className={axiosMessage.type}>{axiosMessage.message}</p>
                    <button
                      className='btn btn-danger'>
                      Submit
                    </button>
                    </form>))
              :
              (<form onSubmit = {passwordFormSubmitHandler}>
                <input
                      className='form-control'
                      type='text'
                      placeholder='One Time Password'
                      required
                    />
                <input
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
                    <p className={axiosMessage.type}>{axiosMessage.message}</p>
                    <button
                      disabled={!passwordDidMatched}
                      style={{ marginTop: "30px" }}
                      type='submit'
                      className='btn btn-danger'>
                      Submit
                    </button>
                    </form>)
                    
            ) 
                    }
            

            <div>
            {forgotPassword 
            ?
            <h3 onClick={forgotPasswordHandler} className='forgotpassword'>Forgot Password</h3>
            :
            <h3 onClick={forgotPasswordHandler} className='forgotpassword'>Back to sign in</h3>
            }
            </div>
            <div className='banner'>Powered by ABACI Technologies Pvt Ltd.</div>
          </div>
        </div>
      </>
    );
  }
  return <>{DOMComponent}</>;
}
