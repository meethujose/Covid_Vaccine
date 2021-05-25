import React, { useState } from "react";
import PlusFilterIcon from "../../Icons/plus.svg";
import "antd/dist/antd.css";
import Modal from "../Modal/Modal";
import './AddUser.css'
import Register from "../../Register/Register";
function AddUser() {
  const [showModal, setShowModal] = useState(false);

  const clickHandler = () => {
    const tempShowModal = showModal;
    setShowModal(!tempShowModal);
  };

  return (
    <>
      {showModal ? (
        <Modal onClick={clickHandler} className='wrapper'>
          <Register setshowModal={setShowModal} />
        </Modal>
      ) : null}
      <div className='fab_plus_btn_container'>
        <div>
          <img
            className='addnewicon'
            onClick={clickHandler}
            src={PlusFilterIcon}
            alt=''
          />
        </div>
      </div>
    </>
  );
}

export default AddUser;
