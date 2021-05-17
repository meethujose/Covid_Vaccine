import React, { useEffect, useState } from "react";
import db, { storage } from "../../../Data/FirebaseConfig";
import "./TestDetails.css";
import Modal from "../Modal/Modal";
import moment from "moment";
import axios from "axios";
import DownloadSVG from "../../Icons/download.svg";
import EditSVG from "../../Icons/edit.svg";
import CancelSVG from "../../Icons/cancel.svg";
import axiosInstance from '../../../axios'
import getAxiosInstance from "../../../axiosInstance";
import { useSelector,useDispatch } from "react-redux";
import {testAddUpdateAction} from "../../../store/testResult";
export default function VaccineDetails({ selectedUser }) {
  const fileRef = React.useRef();
  const dispatch = useDispatch();
  const testResultAddUpdateState = useSelector((state) => state.testResult);
  const [editModalStatus, setEditModalStatus] = useState(false);
  const [userTestDetails, setUserTestDetails] = useState([]);
  const [ShowTestResultModal, setShowTestResultModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState({});
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState();
  const[mount,setMount]=useState(true);
  // useEffect to fetch Vaccination Database
  useEffect(() => {
    getAxiosInstance().then(async axiosInstance=>{
    axiosInstance
      .get(`api/testresultlist/${selectedUser.id}`)
      .then((response) => {
        setMount(false);
        setUserTestDetails(response.data);
      })
      .catch((err) => console.error(err));
    });
  }, [selectedUser,mount,testResultAddUpdateState]);
  // handleChange Event
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  const editModalHandler = () => {
    const tempEditShowModal = editModalStatus;
    setEditModalStatus(!tempEditShowModal);
  };
  const editTestData = (data) => {
    setEditModalStatus(true);
    setSelectedTest(data);
  };

  const sendEditRequest = async (data) => {
    getAxiosInstance().then(async axiosInstance=>{
    await axiosInstance
      .put(
        `api/testresultrud/${selectedTest.id}`,
        data
      )
      .then(function (response) {
        console.log("edit response: ", response);
      })
      .catch((error) => {
        console.log("edit failed ", error);
      });
      });
  };
  // function edit
  const editTestDetails = async (e) => {
    setMount(true);
    e.preventDefault();
    //image upload

    if (fileRef.current && fileRef.current.files[0]) {
      var file = fileRef.current.files[0];
      var storageRef = storage.ref().child(`TestResult${file.name}`).put(file);
      storageRef.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then(async (url) => {
            console.log(url);
            const data = {
              id: selectedTest.id,
              test_date: formData.Test_Date,
              test_result: result,
              remarks: formData.Remarks,
              attachments: url,
              name: selectedUser.id,
            };
            sendEditRequest(data);

            formData.First_Dose = "";
            formData.Remarks = "";

            setShowTestResultModal(false);
          });
        }
      );
    } else {
      const data = {
        id: selectedTest.id,
        test_date: formData.Test_Date
          ? formData.Test_Date
          : selectedTest.test_date,
        test_result: result ? result : selectedTest.test_result,
        remarks: formData.Remarks ? formData.Remarks : selectedTest.remarks,
        attachments: selectedTest.attachments,
        name: selectedUser.id,
      };
      sendEditRequest(data);
    }
  };
// delete Test Result Details
const deleteTestData=async(data)=>{
 setMount(true);
  console.log(data);
  getAxiosInstance().then(async axiosInstance=>{
  await axiosInstance
  .delete(
    `api/testresultrud/${data.id}`,
    
  )
  .then(function (response) {
    console.log("delete response: ", response);
  })
  .catch((error) => {
    console.log("delete failed ", error);
  });
  });
}
  return (
    <div className='test-wrapper'>
      {userTestDetails &&
        userTestDetails.map((test) => (
          <div className='row'>
            <h1 className='test-label '>{test.test_result}</h1>
            <h1 className='test-date'>{test.test_date}</h1>
            <img
              src={DownloadSVG}
              alt=''
              className='test-download-attachment'
            />
            <img
              src={EditSVG}
              alt=''
              className='test-edit'
              onClick={() => editTestData(test)}
            />
            <img
              src={CancelSVG}
              alt=''
              className='test-edit'
              onClick={() => deleteTestData(test)}
            />
          </div>
        ))}
      {editModalStatus ? (
        <Modal onClick={editModalHandler}>
          <div className='vaccine'>
            <form className='addform' onSubmit={editTestDetails}>
              <h3 className='emplist__name empVaccine--text'>Test Details</h3>
              <div className='form_box'>
                <label className='EmpSetailsText'>Result Date</label>
                <input
                  type='date'
                  placeholder='Test_Date'
                  name='Test_Date'
                  defaultValue={selectedTest.test_date}
                  required
                  className='EditTestinputField '
                  onChange={handleChange}
                 
                
                />
              </div>
              <div className='form_box'>
                <label className='EmpSetailsText'>Result:</label>
                <select
                  id='Result'
                  name='Result'
                  value={result}
                  defaultValue={selectedTest.test_result}
                  className='EditTestinputField '
                  required
                  onChange={(e) => setResult(e.target.value)}>
                  <option value='Negative'   className='EditTestinputField '>
                    Negative
                  </option>
                  <option value='Positive'   className='EditTestinputField '>
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
                  className='EditTestinputField '
                  onChange={handleChange}
                  defaultValue={selectedTest.remarks}
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
              <input type='submit' className=' EditTestButton' value='Add' />
            </form>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
