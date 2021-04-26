import React, { useState, useEffect } from "react";
import db, { storage } from "../../Data/FirebaseConfig";
import axios from "axios";
import EmpCard from "../UI/EmpCard/EmpCard";

import Modal from "../UI/Modal/Modal";
import "./Emplist.css";
import { Link } from "react-router-dom";
import Plus from "../Icons/plus.svg";
import report from "../Icons/report.svg";
import Register from "../Register/Register";
export default function EmpList({ userArray, setUserArray, setMount, mount }) {
  const fileRef = React.useRef();
  const [selectedUser, setSelectedUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const clickPlusHandler = () => {
    const tempVaccineShowModal = showVaccineModal;
    setShowVaccineModal(!tempVaccineShowModal);
  };
  // useEffect(() => {
  //   const tempUserArray = [];
  // db.collection("users")
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data().name);

  //       tempUserArray.push(doc.data());
  //     });
  //     setUserArray(tempUserArray);
  //     setMount(false);
  //   });

  // const result = await axios(
  //   'http://lulu.transituae.net/api/emplist/',
  // );

  // }, [mount]);

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
              name: "1",
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
    //
  };
  //

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

          <div className='EmpVaccine'>
            <h3 className='emplist__name emplist--black'>
              Vaccination Details
            </h3>
            <img className='plusicon' src={Plus} onClick={clickPlusHandler} />
            {showVaccineModal ? (
              <Modal onClick={clickPlusHandler}>
                <div className='vaccine'>
                  <form className='addform' onSubmit={submitData}>
                    <h3 className='emplist__name empVaccine--text'>
                      Vaccination Details
                    </h3>
                    {/* file */}
                    {/* <label>
                    <input type='file' id='file' name='attachment' required ></input>
                  </label> */}

                    <div className='form_box'>
                      <label className='EmpSetailsText'>First Dose:</label>
                      <input
                        type='date'
                        placeholder='First Dose'
                        name='First_Dose'
                        required
                        className='inputField'
                        onChange={handleChange}
                      />
                    </div>
                    <div className='form_box'>
                      <label className='EmpSetailsText'>Remarks:</label>
                      <input
                        type='text'
                        placeholder='Remarks'
                        name='Remarks'
                        required
                        className='inputField'
                        onChange={handleChange}
                      />
                    </div>
                    <label>Select a file:</label>
                    <input
                      type='file'
                      id='myfile'
                      name='myfile'
                      ref={fileRef}
                      onChange={handleChange}></input>
                    <input
                      type='submit'
                      className=' regSubButton'
                      value='Add'
                    />
                  </form>
                </div>
              </Modal>
            ) : null}
          </div>

          {/* Emp Test Details */}
          {/* <div className='EmpTest'></div> */}
        </Modal>
      ) : null}
    </div>
  );
}
