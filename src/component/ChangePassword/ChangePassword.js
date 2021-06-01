
import { Modal, Button } from "antd";
import React, { useState, useEffect } from "react";

import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import { Redirect, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";


export default function ChangePassword(props) {

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

  const [changePassword, setChangePassword] = useState(false);
  const handleOk = () => {
    props.setChangePasswordModal(false);
  };

  const handleCancel = () => {
    props.setChangePasswordModal(false);
  };

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


  const forgotPasswordHandler = () => {
    const tempState = forgotPassword;
    setForgotPassword(!tempState);
    newPassword === confirmNewPassword
      ? setPasswordDidMatched(true)
      : setPasswordDidMatched(false);
  };
  return (
    <div>
      <Modal
        title='Change Password'
        visible={props.modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          // <Button key='back'>Return</Button>,
          <Button
            key='back'
            onClick={() => setChangePassword(changePassword ? false : true)}>
           Save
          </Button>,
        ]}>
        <form className='addform'>
          <div className='form_box'>
            <label>New Password</label>
            <input
              type='text'
              placeholder='New Password'
              name='New_Password'
              className='reginputField'
            />
          </div>

          <div className='form_box'>
            <label>Confirm Password</label>
            <input
              type='text'
              placeholder='Confirm Password'
              name='ConfirmPassword'
              className='reginputField'
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
