import React, { useState } from "react";
import "./AddUser.css";
import Modal from "../../component/UI/Modal/Modal";
import Register from "../Register/Register";
import AddIcon from "../Icons/AddUser.svg";
import LogoutIcon from "../Icons/Logout.svg";

export default function AddUser() {
  const [showModal, setShowModal] = useState(false);
  const clickHandler = () => {
    const tempShowModal = showModal;
    setShowModal(!tempShowModal);
  };
  return (
    <div className='AddUser'>
      <div>
        <img className='logouticon' src={LogoutIcon} onClick={clickHandler} />
        <img className='icon' src={AddIcon} onClick={clickHandler} />
      </div>
      {showModal ? (
        <Modal onClick={clickHandler}>
          <Register setShowModal={setShowModal}  />
        </Modal>
      ) : null}
    </div>
  );
}
