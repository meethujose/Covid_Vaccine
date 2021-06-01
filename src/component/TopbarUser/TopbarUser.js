import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./TopbarUser.css";
import { useSpring, animated } from "react-spring";
import BackDrop from "./BackDrop";
import { isAuth } from "../../store/isAuthenticated";
import EditTestResult from "../EditTestResult/EditTestResult";
import EditVaccine from "../EditVaccine/EditVaccine";
import EditProfile from "../EditProfile/EditProfile";
import ChangePassword from "../ChangePassword/ChangePassword";

export default function TopbarUser(props) {


  
  const history = useHistory();
  const dispatch = useDispatch();
  const [EditProfileModal, setEditProfileModal] = useState(false);
  const [ChangePasswordModal, setChangePasswordModal] = useState(false);
  const [EditVaccineModal, setEditVaccineModal] = useState(false);
  const [EditTestResultModal, setEditTestResultModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const styles = useSpring({
    width: isHovered ? 250 : 0,
    height: isHovered ? "auto" : 0,
    scale: isHovered ? 1 : 0,
    transform: "translate3d(0px,0,0) scale(1) rotateX(0deg)",
    backgroundColor: isHovered ? "white" : "green",
    borderRadius: 10,
  });

  const animation_on_button = () => {
    const temp = isHovered;
    setIsHovered(!temp);
  };

  // to show edit profile Modal
  const EditProfileModalView = () => {
    setEditProfileModal(EditProfileModal ? false : true);
  };

  // to show vaccine Edit Modal
  const EditVaccineCardHandler = () => {
    setEditVaccineModal(!EditVaccineModal ? false :true);
  };

  // to show vaccine Edit Modal
  const EditTestResultCardHandler = () => {
    history.push("/testResult");
  };

  // logout
  const clickLogoutHandler = () => {
  localStorage.clear();
  history.push('/signin')
  };

  return (
    <>
      {isHovered ? <BackDrop onClick={animation_on_button} /> : null}
      <div className='profile__wrapper'>
        <div className='avatar__wrapper'>
          <img
            className='avatar'
            onClick={animation_on_button}
            src={props.avatar}
            alt=''
          />
        </div>
        <div className='dropdown__wrapper'>
          <animated.div className='animateddiv' style={styles}>
            <div className='dropdownhead'>
              {isHovered ? (
                <div className='name'>{props.name}</div>
              ) : (
                <div className='name'>.</div>
              )}
              {isHovered ? (
                <div className='email'>{props.email}</div>
              ) : (
                <div className='name'>.</div>
              )}
            </div>
            <div className='dropdownbody'>
              {isHovered ? (
                <div className='dropdownbodytext'>
                  <ul className='dropdown__ul'>
                    <li className='dropdown__li' onClick={clickLogoutHandler}>
                      Logout
                    </li>
                    <li
                      className='dropdown__li'
                      onClick={() =>
                        setEditProfileModal(EditProfileModal ? false : true)
                      }>
                      My Profile
                    </li>
                    <li
                      className='dropdown__li'
                      onClick={() =>
                        setChangePasswordModal(
                          ChangePasswordModal ? false : true
                        )
                      }>
                      Change Password
                    </li>
                    <li
                      className='dropdown__li'
                      onClick={() => setEditVaccineModal( EditVaccineModal ? false : true)}>
                      Add/Edit Vaccine Details
                    </li>
                    <li
                      className='dropdown__li'
                      onClick={() => EditTestResultCardHandler()}>
                      Add/Edit Test Details
                    </li>
                  </ul>
                </div>
              ) : (
                <div className='name'>.</div>
              )}
            </div>
          </animated.div>
        </div>

        <EditProfile
          modalVisible={EditProfileModal}
          // EditProfileModal={EditProfileModal}
          setEditProfileModal={setEditProfileModal}
        />
        <ChangePassword
          modalVisible={ChangePasswordModal}
          setChangePasswordModal={setChangePasswordModal}
        />
        {EditVaccineModal ? (
          <EditVaccine
             modalVisible={EditVaccineModal}
            // EditVaccineModal={EditVaccineModal}
            setEditVaccineModal={setEditVaccineModal}
          />
        ) : null}

      </div>
    </>
  );
}
