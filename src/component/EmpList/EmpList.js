import React, { useState, useEffect } from "react";
import db, { storage } from "../../Data/FirebaseConfig";
import axios from "axios";
import EmpCard from "../UI/EmpCard/EmpCard";
import DetailsCard from "../UI/DetailsCard/DetailsCard";
import Moment from "moment";
import Modal from "../UI/Modal/Modal";
import "./Emplist.css";
import { Link } from "react-router-dom";
import Plus from "../Icons/plus.svg";
import report from "../Icons/report.svg";
import Register from "../Register/Register";
import moment from "moment";
import VaccineDetails from "../UI/VaccineDetails/VaccineDetails";
import TestDetails from "../UI/TestDetails/TestDetails";

export default function EmpList({ userArray, setUserArray, setMount, mount }) {
  const fileRef = React.useRef();
  const [selectedUser, setSelectedUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [userVaccineData, setUserVaccineData] = useState([]);
  const [vaccineStatus, setVaccineStatus] = useState(<h3>Loading...</h3>);
  const [status, setStatus] = useState(true);

  const clickPlusHandler = () => {
    const tempVaccineShowModal = showVaccineModal;
    setShowVaccineModal(!tempVaccineShowModal);
  };

  /**
   * reset selected user
   */
  const resetSelectedUser = () => {
    setSelectedUser({});
  };

  useEffect(() => {
    axios
      .get("http://lulu.transituae.net/api/emplist/")
      .then((response) => {
        setUserArray(response.data);
        setMount(false);
      })
      .catch((err) => console.error(err));
  }, []);
  
  const clickHandler = (item) => {
    setSelectedUser(item);
    console.log("selected item", item);
    const tempShowModal = showModal;
    setShowModal(!tempShowModal);
  };

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  // submit data
  const submitData = async (e) => {
    e.preventDefault();
    //image upload

    console.log("clicked");
    var file = fileRef.current.files[0];
    var storageRef = storage.ref().child(`Attachments/${file.name}`).put(file);

    storageRef.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then(async (url) => {
          console.log(url);
          const res = await axios
            .post("http://lulu.transituae.net/api/vaccinecreate/", {
              vaccine_dose: "first",
              vaccine_date: formData.First_Dose,
              remarks: formData.Remarks,
              attachments: url,
              name: selectedUser.id,
            })
            .then(function (response) {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });

          formData.username = "";
          formData.PhoneNumber = "";
          formData.EmiratesId = "";
          setShowModal(false);
        });
      }
    );
  };

  return (
    <div>
      {userArray.map((item) => (
        <EmpCard key={item.emiratesID} onClick={() => clickHandler(item)}>
          <div className='empcard__textwrapper'>
            <h3 className='emplist__name'> {item.name}</h3>
            <h3 className='emplist__eid'>{item.emiratesID}</h3>
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
                {selectedUser.emiratesID}
              </h3>
            </div>
          </div>

          {/* Emp Vaccination Details */}
          <DetailsCard
            selectedUser={selectedUser}
            detailType='Vaccination Details'
            type='VaccinationDetails'
            userVaccineData={userVaccineData}
            // resetSelectedUser={resetSelectedUser}
            >
            <VaccineDetails
              selectedUser={selectedUser}
              userVaccineData={userVaccineData}
              setUserVaccineData={setUserVaccineData}
            />
          </DetailsCard>

          <DetailsCard
            detailType='COVID Test Details'
            type='TestDetails'
            selectedUser={selectedUser}>
            <div className='scrollable'>
              <TestDetails selectedUser={selectedUser} />
            </div>
          </DetailsCard>
        </Modal>
      ) : null}
    </div>
  );
}
