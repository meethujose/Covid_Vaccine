import React, { useState, useEffect } from "react";
import EmpCard from "../UI/EmpCard/EmpCard";
import db from "../../Data/FirebaseConfig";
import Modal from "../UI/Modal/Modal";
import "./Emplist.css";
import { Link } from 'react-router-dom';

import report from "../Icons/report.svg";
export default function EmpList({userArray, setUserArray, setMount, mount}) {

  
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
          <img className='emplist' src={report} />
          <h3 className="emplistheader"> {item.name}</h3>
          <p className="emplistheader">{item.eid}</p>
        </EmpCard>
      ))}
      {showModal ? (
       
        <Modal onClick={clickHandler}>
          <div className="cardwrap">
           <div className="Empcard">
          <img className="imgCard"src={selectedUser.Avatar} />
          <h3>{selectedUser && selectedUser.name}</h3>
          <h3>{selectedUser && selectedUser.eid}</h3>
          </div>
      <div className="EmpVaccine"></div>
      <div className="EmpTest"></div>
      </div>
        </Modal>
        
      ) : null}
      
    </div>
  );
}
