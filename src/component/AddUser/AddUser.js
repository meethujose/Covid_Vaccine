import React, { useState } from "react";
import "./AddUser.css";
import Modal from "../../component/UI/Modal/Modal";
import Register from "../Register/Register";
import AddIcon from "../Icons/AddUser.svg";
import LogoutIcon from "../Icons/Logout.svg";
import SettingsIcon from "../Icons/settings.svg";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { isAuth } from "../../store/isAuthenticated";

// test add user
export default function AddUser() {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const clickHandler = () => {
    const tempShowModal = showModal;
    setShowModal(!tempShowModal);
  };

  const setLogout = () => {
    dispatch(isAuth());
    localStorage.clear();
    history.replace("/login");
  };

  return (
    <div className="AddUser">
      <img
          className="settingsicon"
          src={SettingsIcon}
         
        alt=""/>
      <div>
        <img
          className="logouticon"
          src={LogoutIcon}
          onClick={() => setLogout()}
        alt=""/>
        <img className="icon" src={AddIcon} onClick={clickHandler} alt=""/>
      </div>
      {showModal ? (
        <Modal onClick={clickHandler}>
          <Register setShowModal={setShowModal} />
        </Modal>
      ) : null}
    </div>
  );
}
