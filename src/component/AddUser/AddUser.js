import React, { useState } from "react";
import "./AddUser.css";
import Modal from "../../component/UI/Modal/Modal";
import Register from "../Register/Register";
import AddIcon from "../Icons/AddUser.svg";
import userIcon from "../Icons/uprofile.svg";
import SettingsIcon from "../Icons/settings.svg";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { isAuth } from "../../store/isAuthenticated";
import Invite_User from "../Invite_User/Invite_User";
// test add user
export default function AddUser() {
  const [showModal, setShowModal] = useState(false);
  const [showInviteUserModal, setShowInviteUserModal] = useState(false);
  
  const dispatch = useDispatch();
  const clickHandler = () => {
    const tempShowModal = showModal;
    setShowModal(!tempShowModal);
  };
  const invite_UserHandler = () => {
    setShowInviteUserModal(!showInviteUserModal);
  };
  const setLogout = () => {
    dispatch(isAuth());
    localStorage.clear();
    // history.replace("/login");
  };

  return (
    <div className="AddUser">
      <img
          className="settingsicon"
          src={SettingsIcon}
          onClick={invite_UserHandler} 
        alt=""/>
            {showInviteUserModal ? (
        <Modal onClick={invite_UserHandler}className="wrapper">
          <Invite_User setShowInviteUserModal={setShowInviteUserModal} />
        </Modal>
      ) : null}
      <div>
        <img
          className="logouticon"
          src={userIcon}
          onClick={() => setLogout()}
        alt=""/>
        




	
		
             
        <img className="icon" src={AddIcon} onClick={clickHandler} alt=""/>
      </div>
      {showModal ? (
        <Modal onClick={clickHandler}className="wrapper">
          <Register setShowModal={setShowModal} />
        </Modal>
      ) : null}
    </div>
  );
}
