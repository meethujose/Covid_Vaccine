import React, { useState, useEffect, useRef } from "react";
import db, { storage } from "../../../Data/FirebaseConfig";
import "./DetailsCard.css";
import Plus from "../../Icons/plus.svg";
import Modal from "../Modal/Modal";
import moment from "moment";
import axios from "axios";

export default function DetailsCard(props) {
  const fileRef = React.useRef();
  const TestfileRef = React.useRef();
  const [formData, setFormData] = useState({});
  const [TestformData, setTestFormData] = useState({});
  const [ShowVaccineModal, setShowVaccineModal] = useState(false);
  const [ShowTestDetailModal, setTestDetailsModal] = useState(false);

  // click Handler to Show Modal to Edit  vaccine details
  const DetailsCardHandler = () => {
    switch (props.type) {
      case "VaccinationDetails": {
        setShowVaccineModal(!ShowVaccineModal);
        break;
      }

      case "TestDetails": {
        setTestDetailsModal(!ShowTestDetailModal);
        break;
      }
      default:
        return false;
    }
  };

  const isVaccinationData = (vaccinationData) => {
    if (!vaccinationData) {
      return (
        <img
          className='detail-card-header__plus_icon'
          src={Plus}
          alt=''
          onClick={DetailsCardHandler}
        />
      );
    }
  };

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  // submit
  const submitData = async (e) => {
    e.preventDefault();

    // attachment upload
    console.log("clicked");
    var file = fileRef.current.files[0];
    if (file) {
      var storageRef = storage
        .ref()
        .child(`Attachments/${file.name}`)
        .put(file);

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
                vaccine_dose:
                  props.userVaccineData && props.userVaccineData.length == 1
                    ? "Second"
                    : "First",
                vaccine_date: formData.Dose_Date,
                remarks: formData.Remarks,
                attachments: url,
                name: props.selectedUser.id,
              })
              .then(function (response) {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });

            formData.First_Dose = "";
            formData.Remarks = "";

            setShowVaccineModal(false);
          });
        }
      );
    } else {
      alert("File not selected");
    }
  };
  // handling test details Form
  const handleTestChange = (e) => {
    setTestFormData((TestformData) => ({
      ...TestformData,
      [e.target.name]: e.target.value,
    }));
  }
  const submitTestData = (e) => 
  {
   
    e.preventDefault();
    console.log("testresult",fileRef.current.files[0]);
  
    if (fileRef.current && fileRef.current.files[0]) {
      var Testfile=  fileRef.current.files[0];
      var storageRef = storage
        .ref()
        .child(`TestResult/${Testfile.name}`)
        .put(Testfile);

      storageRef.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then(async (url) => {
            console.log(url);
            await axios
              .post("http://lulu.transituae.net/api/testresultcreate/", {
                test_date: TestformData.Test_Date,
                test_result: TestformData.Result,
                remarks: TestformData.Remarks,
                attachments: url,
                name: props.selectedUser.id,
              })
              .then(function (response) {
                console.log("testdata",response);
              })
              .catch((error) => {
                console.log(error);
              });

           
          });
        }
      );
    } else {
      alert("File not selected");
    }
  };
 
  return (
    <div className='detail-card'>
      <div className='detail-card-header'>
        <h3 className='detail-card-header__title'>{props.detailType}</h3>
        {props.userVaccineData && props.userVaccineData.length < 2 ? (
          <img
            className='detail-card-header__plus_icon'
            src={Plus}
            alt=''
            onClick={DetailsCardHandler}
          />
        ) : (
          isVaccinationData(props.userVaccineData)
        )}
      </div>
      {/* <div>dose: {props.userVaccineData &&  props.userVaccineData && props.userVaccineData.length == 1? "First": "Second"}</div> */}
      {ShowVaccineModal ? (
        <Modal onClick={DetailsCardHandler}>
          <div className='vaccine'>
            <form className='addform' onSubmit={submitData}>
              <h3 className='emplist__name empVaccine--text'>
                Vaccination Details
              </h3>
              <div className='form_box'>
                <label className='EmpSetailsText'>
                  {props.selectedUser &&
                  props.userVaccineData &&
                  props.userVaccineData.length == 1
                    ? "First Dose"
                    : "Second Dose"}
                </label>
                <input
                  type='date'
                  placeholder='Dose date'
                  name='Dose_Date'
                  required
                  className='inputField'
                  onChange={handleChange}
                  max={moment().utc().format("YYYY-MM-DD")}
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

              <label className='EmpSetailsText'>Attachment:</label>
              <input
                type='file'
                id='myfile'
                name='myfile'
                ref={fileRef}
                onChange={handleChange}></input>
              <input type='submit' className=' regSubButton' value='Add' />
            </form>
          </div>
        </Modal>
      ) : null}

      {/* edit */}
      {ShowTestDetailModal ? (
        <Modal onClick={DetailsCardHandler}>
          <div className='vaccine'>
            <form className='addform' onSubmit={submitTestData}>
              <h3 className='emplist__name empVaccine--text'>Test Details</h3>
              <div className='form_box'>
                <label className='EmpSetailsText'>Result Date</label>
                <input
                  type='date'
                  placeholder='Test_Date'
                  name='Test_Date'
                  required
                  className='inputField'
                  onChange={handleTestChange}
                  max={moment().utc().format("YYYY-MM-DD")}
                />
              </div>
              <div className='form_box'>
                <label className='EmpSetailsText'>Result:</label>
                <input
                  type='text'
                  placeholder='Result'
                  name='Result'
                  required
                  className='inputField'
                  onChange={handleTestChange}
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
                  onChange={handleTestChange}
                />
              </div>
              <label className='EmpSetailsText'>Attachment:</label>
              <input
                type='file'
                id='myfile'
                name='myfile'
                ref={fileRef}
                onChange={handleTestChange}></input>
              <input type='submit' className=' regSubButton' value='Add' />
            </form>
          </div>
        </Modal>
      ) : null}
      {props.children}
    </div>
  );
}