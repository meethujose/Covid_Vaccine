import React, { useState } from "react";

import userIcon from "../Icons/uprofile.svg";
import SettingsIcon from "../Icons/gear.svg";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { isAuth } from "../../store/isAuthenticated";
import { useHistory } from "react-router-dom";
import Modal from "../UI/Modal/Modal";
import getAxiosInstance from "../../axiosInstance";
import { userDataUpdateAction } from "../../store/userData";
import EditProfile from "../EditProfile/EditProfile";
export default function EditTestResult({setEditTestResultModal,EditTestResultModal}) {

  const dispatch = useDispatch();
  const labelRef = React.useRef();
  const history = useHistory();
  const [TestformData, setTestFormData] = useState({});
  const [formData, setFormData] = useState({});
  const [userVaccineData, setUserVaccineData] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [ShowVaccineModal, setShowVaccineModal] = useState(false);
  const [ShowTestDetailModal, setTestDetailsModal] = useState(false);
 

  const useraddedData = useSelector((state) => state.userData[0]);
  console.log("userRedux state", useraddedData);

  // handling test details Form

  const handleTestChange = (e) => {
    setTestFormData((TestformData) => ({
      ...TestformData,
      [e.target.name]: e.target.value,
    }));
  };

  // to show Test Modal

  const TestDetailsCardHandler = () => {
    setEditTestResultModal(!EditTestResultModal);
  };


  //To submit Test data

  const submitTestData = async (e) => {
    e.preventDefault();
    getAxiosInstance().then(async (axiosInstance) => {
      await axiosInstance
        .post("userapi/accountscreate/", {
          test_date: TestformData.Test_Date,
          test_result: TestformData.Result,
          remarks: TestformData.Remarks
            ? TestformData.Remarks
            : "No Remarks added",
          attachments: TestformData.testfile ? TestformData.testfile : "",
          name: selectedUser.id,
        })
        .then(function (response) {
          // dispatch(testAddUpdateAction.added());
          console.log(response);
          TestformData.Result = "";
          TestformData.Remarks = "";
          TestformData.Test_Date = "";
          setTestDetailsModal(false);
        });
    });
  };

  return (
    <div>
        <Modal onClick={TestDetailsCardHandler}>
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
                  onChange={handleTestChange}></input>
              </div>
              <input type='submit' className='AddButton' value='Add' />
            </form>
          </div>
        </Modal>
    </div>
  );
}
