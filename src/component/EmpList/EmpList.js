import React, { useState, useEffect } from "react";
import EmpCard from "../UI/EmpCard/EmpCard";
import db from "../../Data/FirebaseConfig";
import Modal from "../UI/Modal/Modal";
import "./Emplist.css";
import { Link } from "react-router-dom";

import report from "../Icons/report.svg";
export default function EmpList({ userArray, setUserArray, setMount, mount }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  useEffect(() => {
    const tempUserArray = [];
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data().name);

          tempUserArray.push(doc.data());
        });
        setUserArray(tempUserArray);
        setMount(false);
      });
  }, [mount]);
  const clickHandler = (item) => {
    setSelectedUser(item);

    const tempShowModal = showModal;
    setShowModal(!tempShowModal);
  };
  return (
    <div>
      {userArray.map((item) => (
        <EmpCard key={item.eid} onClick={() => clickHandler(item)}>
          <div className='empcard__textwrapper'>
            <h3 className='emplist__name'> {item.name}</h3>
            <h3 className="emplist__eid">{item.eid}</h3>
          </div>
          <div className='empcard__imagewrapper'>
            <img className='reporticon' src={report} />
          </div>
        </EmpCard>
      ))}
      {showModal ? (
        <Modal onClick={clickHandler}>
          <div className='EmpDetailsWrap'>
            <img className={"imgCard"} src={selectedUser.Avatar} alt='' />
            <div>
              <h3 className='emplist__name emplist--white'>
                {selectedUser.name}
              </h3>
              <h3 className='emplist__eid emplist--white'>
                {selectedUser.eid}
              </h3>
            </div>
          </div>
          <div className='EmpVaccine'></div>
          <div className='EmpTest'></div>
        </Modal>
      ) : null}
    </div>
  );
}
