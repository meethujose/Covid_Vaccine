import React, { useState} from "react";
import { storage } from "../../../Data/FirebaseConfig";
import "./DetailsCard.css";
import Plus from "../../Icons/plus.svg";
import Modal from "../Modal/Modal";
import moment from "moment";
import getAxiosInstance from "../../../axiosInstance";
import { useDispatch } from "react-redux";
import { vaccineAddUpdateAction } from "../../../store/vaccineAddUpdate";
import { testAddUpdateAction } from "../../../store/testResult";
export default function DetailsCard(props) {
  let imageUrl = "";
  let testfileUrl="";
  const fileRef = React.useRef();
  const dispatch = useDispatch();
  const labelRef = React.useRef();
  const [formData, setFormData] = useState({});
  const [TestformData, setTestFormData] = useState({});
  const [ShowVaccineModal, setShowVaccineModal] = useState(false);
  const [ShowTestDetailModal, setTestDetailsModal] = useState(false);
  
  

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
  // vaccine Details
  const submitData  = async (e) => {
    e.preventDefault();
    var file = fileRef.current.files[0];
    var storageRef = storage.ref().child(`Attachments/${props.selectedUser.id}`);
    storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(async (url) => {
          testfileUrl=url;
  
        }).then(async()=>{
          getAxiosInstance().then(async axiosInstance=>{
            await  axiosInstance
            .post("api/vaccinecreate/", {
              vaccine_dose:
              labelRef.current.innerHTML === "First Dose"
                ? "First"
                : "Second",
            vaccine_date: formData.Dose_Date,
            remarks: formData.Remarks ? formData.Remarks : "No Remarks",
            attachments: imageUrl ? imageUrl : "https://firebasestorage.googleapis.com/v0/b/vaccine-9e17d.appspot.com/o/images%2FaddEmployee.png?alt=media&token=ac8c7ac6-773d-44ff-afa0-1aa76ea1d3d7",
            name: props.selectedUser.id,
           })
           .then(function (response) {
            dispatch(vaccineAddUpdateAction.added());
             console.log(response);
             formData.Dose_Date = "";
             formData.Remarks= "";
          
             setShowVaccineModal(false);
           });
         });
        })
      });
  };







  // handling test details Form
  const handleTestChange = (e) => {
    setTestFormData((TestformData) => ({
      ...TestformData,
      [e.target.name]: e.target.value,
    }));
  };

const submitTestData = async (e) => {
  e.preventDefault();
  var Testfile = fileRef.current.files[0];
  var storageRef = storage.ref().child(`TestResult/${props.selectedUser.id}`);
  storageRef.put(Testfile).then((snapshot) => {
      snapshot.ref.getDownloadURL().then(async (url) => {
        testfileUrl=url;

      }).then(async()=>{
        getAxiosInstance().then(async axiosInstance=>{
          await  axiosInstance
          .post("api/testresultcreate/", {
            test_date: TestformData.Test_Date,
                            test_result: TestformData.Result,
                            remarks: TestformData.Remarks? TestformData.Remarks:"No Remarks added",
                            attachments: testfileUrl? testfileUrl: "",
                            name: props.selectedUser.id,
         })
         .then(function (response) {
          dispatch(testAddUpdateAction.added());
           console.log(response);
           TestformData.Result = "";
           TestformData.Remarks= "";
           TestformData.Test_Date = "";
           setTestDetailsModal(false);
         });
       });
      })
    });
};
  return (
    <div className='detail-card'>
      {/* <div className='detail-card-header'>
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
      </div> */}
      {/* <div>dose: {props.userVaccineData &&  props.userVaccineData && props.userVaccineData.length == 1? "First": "Second"}</div> */}
      {ShowVaccineModal ? (
        <Modal onClick={DetailsCardHandler}>
          <div className='vaccine'>
            <form className='addform' onSubmit={submitData}>
              <h3 className='emplist__name empVaccine--text'>
                Vaccination Details
              </h3>
              <div className='form_box'>
                <label className='EmpSetailsText' ref={labelRef}>
                  {props.selectedUser &&
                  props.userVaccineData &&
                  props.userVaccineData.length === 0
                    ? "First Dose"
                    : props.selectedUser &&
                      props.userVaccineData &&
                      props.userVaccineData[0].vaccine_dose === "First"
                    ? "Second Dose"
                    : "First Dose"}
                </label>

                {props.userVaccineData.length === 0 ? (
                  <input
                    type='date'
                    placeholder='Dose date'
                    name='Dose_Date'
                    required
                    className='DetailsinputField'
                    onChange={handleChange}
                    min={moment().utc().format("YYYY-MM-DD")}
                  />
                ) : props.userVaccineData[0].vaccine_dose === "First" ? (
                  <input
                    type='date'
                    placeholder='Dose date'
                    name='Dose_Date'
                    required
                    className='DetailsinputField'
                    onChange={handleChange}
                    min={props.userVaccineData[0].vaccine_date}
                  />
                ) : (
                  <input
                    type='date'
                    placeholder='Dose date'
                    name='Dose_Date'
                    required
                    className='DetailsinputField'
                    onChange={handleChange}
                    max={props.userVaccineData[0].vaccine_date}
                  />
                )}
              </div>
              <div className='form_box'>
                <label className='EmpSetailsText'>Remarks:</label>
                <input
                  type='text'
                  placeholder='Remarks'
                  name='Remarks'
                  className='DetailsinputField'
                  onChange={handleChange}
                />
              </div>
              <div className='form_box'>
                <label className='EmpSetailsText'>Attachment:</label>
                <input
                  type='file'
                  id='myfile'
                  name='myfile'
                  ref={fileRef}
                  onChange={handleChange}></input>
              </div>
              <input type='submit' className='AddButton' value='Add' />
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
                  className='DetailsinputField'
                  onChange={handleTestChange}
                  min={moment().utc().format("YYYY-MM-DD")}
                />
              </div>
              <div className='form_box'>
                <label className='EmpSetailsText'>Result:</label>
                {/* <input
                  type='text'
                  placeholder='Negative/Positive'
                  name='Result'
                  required
                  className='inputField'
                  onChange={handleTestChange}
                /> */}
                <select
                  id='Result'
                  name='Result'
                  className='DetailsinputField'
                  required
                  onChange={handleTestChange}>
                  <option value='Negative' className='DetailsinputField'>
                    Negative
                  </option>
                  <option value='Positive' className='DetailsinputField'>
                    Positive
                  </option>
                </select>
              </div>
              <div className='form_box'>
                <label className='EmpSetailsText'>Remarks:</label>
                <input
                  type='text'
                  placeholder='Remarks'
                  name='Remarks'
                  className='DetailsinputField'
                  onChange={handleTestChange}
                />
              </div>
              <div className='form_box'>
                <label className='EmpSetailsText'>Attachment:</label>
                <input
                  type='file'
                  id='myfile'
                  name='myfile'
                  ref={fileRef}
                  onChange={handleTestChange}></input>
              </div>
              <input type='submit' className='AddButton' value='Add' />
            </form>
          </div>
        </Modal>
      ) : null}
      {props.children}
    </div>
  );
}
