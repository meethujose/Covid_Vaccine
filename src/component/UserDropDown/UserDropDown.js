import React, { useState } from "react";
import "./UserDropDown.css";
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
import { testAddUpdateAction } from "../../store/testResult";
export default function AddUser({ userArray, setUserArray }) {
  const dispatch = useDispatch();
  const labelRef = React.useRef();
  const history = useHistory();
  const [TestformData, setTestFormData] = useState({});
  const [formData, setFormData] = useState({});
  const [userVaccineData, setUserVaccineData] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [ShowVaccineModal, setShowVaccineModal] = useState(false);
  const [ShowTestDetailModal, setTestDetailsModal] = useState(false);
  const [EditProfileModal, setEditProfileModal] = useState(false);

  const useraddedData = useSelector((state) => state.userData[0]);
  console.log("userRedux state", useraddedData);
 
  // logout

  const setLogout = () => {
    dispatch(isAuth());
    localStorage.clear();
  };

  // redirect to settings page

  const settingsHandler = () => {
    history.push("/Settings");
  };

  // form data handling

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  // to show vaccine modal

  const DetailsCardHandler = () => {
    setShowVaccineModal(!ShowVaccineModal);
  };

  // submit vaccine data

  const submitData = async (e) => {
    e.preventDefault();
    console.log("testing",useraddedData);
    const dose=useraddedData.first_dose?'second_dose':(useraddedData.second_dose?'second_dose':'first_dose');
    if(useraddedData){
    getAxiosInstance().then(async (axiosInstance) => {
      await axiosInstance
        .put("userapi/selfvaccine/", {
           first_dose:dose==='first_dose'?true:useraddedData.first_dose,
            first_dose_date: dose==='first_dose'?formData.Dose_Date:useraddedData.first_dose_date,
            // first_dose_details:  dose==='first_dose'?formData.myfile:useraddedData.first_dose_details,
            second_dose:dose==='second_dose'?true:useraddedData.second_dose,
            second_dose_date:dose==='second_dose'?formData.Dose_Date:useraddedData.second_dose_date,
            second_dose_details:  dose==='second_dose'?formData.myfile:useraddedData.second_dose_details,
          // attachments: formData.myfile,
          // name: selectedUser.id,
        })
        .then(function (response) {
          console.log(response.data);
          dispatch(userDataUpdateAction.add([{...response.data}]));         
          console.log(response);
          formData.Dose_Date = "";
          formData.Remarks = "";

          setShowVaccineModal(false);
        }).catch(err=>{
          console.log("vaccine update failed",err);
        });
    });
  }
  };

  // handling test details Form

  const handleTestChange = (e) => {
    setTestFormData((TestformData) => ({
      ...TestformData,
      [e.target.name]: e.target.value,
    }));
  };

  // to show Test Modal

  const TestDetailsCardHandler = () => {
    setTestDetailsModal(!ShowTestDetailModal);
  };

  // to show edit profile Modal

  const EditProfileCardHandler = () => {
    setEditProfileModal(!EditProfileModal);
  };
  //To submit Test data

  const submitTestData = async (e) => {
    e.preventDefault();
    getAxiosInstance().then(async (axiosInstance) => {
      await axiosInstance
        .post("/vaccineapi/selftestcreate/", {
          test_date: TestformData.Test_Date,
          test_result: TestformData.Result,
          remarks: TestformData.Remarks
            ? TestformData.Remarks
            : "No Remarks added",
          attachments: TestformData.testfile ? TestformData.testfile : "",       
        })
        .then(function (response) {
          dispatch(testAddUpdateAction.added());
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
      {localStorage.getItem("is_admin") === "true" ? (
        <img
          className='settingsicon'
          src={SettingsIcon}
          onClick={settingsHandler}
          alt=''
          title='Invite User'
          data-toggle='tooltip'
          data-placement='bottom'
        />
      ) : null}
      <div className='dropdown' style={{ float: "right" }}>
        <img className='dropbtn avataricon' src={userIcon} alt='' />
        <div className='dropdown-content'>
          <a href onClick={() => EditProfileCardHandler()}>
          <i class="fas fa-user-edit"></i>  Profile
          </a>
          {/* {(useraddedData.first_dose=== true&&useraddedData.second_dose=== true)? */}
          <a href onClick={() => DetailsCardHandler()}>
          <i class="fas fa-syringe"></i> Add Vaccine 
          </a>
           {/* :null}  */}
          <a href onClick={() => TestDetailsCardHandler()}>
            <i className='fas fa-notes-medical'></i> Add Test 
          </a>
          <a href onClick={() => setLogout()}>
            <i className='fas fa-sign-out-alt'></i>  Logout
          </a>
        </div>
      </div>
      {EditProfileModal ? <EditProfile EditProfileModal={EditProfileModal} setEditProfileModal={setEditProfileModal} userVaccineData={userVaccineData} selectedUser={selectedUser}/> : null}
      {ShowVaccineModal ? (
        <Modal onClick={DetailsCardHandler}>
          <div className='vaccine'>
            <form className='addform' onSubmit={submitData}>
              <h3 className='emplist__name empVaccine--text'>
                Vaccination Details
              </h3>
              <div>{userVaccineData}</div>
              <div className='form_box'>
                <label className='EmpSetailsText' ref={labelRef}>
                  {/* {selectedUser &&
                  userVaccineData &&
                  userVaccineData.length === 0
                    ? "First Dose"
                    : selectedUser &&
                      userVaccineData &&
                      userVaccineData[0].vaccine_dose === "First"
                    ? "Second Dose"
                    : "First Dose"} */}
                    Vaccine Dose
                </label>

                {userVaccineData.length === 0 ? (
                  <input
                    type='date'
                    placeholder='Dose date'
                    name='Dose_Date'
                    required
                    className='DetailsinputField'
                    onChange={handleChange}
                    min={moment().utc().format("YYYY-MM-DD")}
                  />
                ) : userVaccineData[0].vaccine_dose === "First" ? (
                  <input
                    type='date'
                    placeholder='Dose date'
                    name='Dose_Date'
                    required
                    className='DetailsinputField'
                    onChange={handleChange}
                    min={userVaccineData[0].vaccine_date}
                  />
                ) : (
                  <input
                    type='date'
                    placeholder='Dose date'
                    name='Dose_Date'
                    required
                    className='DetailsinputField'
                    onChange={handleChange}
                    max={userVaccineData[0].vaccine_date}
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
                  onChange={handleChange}></input>
              </div>
              <input type='submit' className='AddButton' value='Add' />
            </form>
          </div>
        </Modal>
      ) : null}
      {/* Test details */}

      {ShowTestDetailModal ? (
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
                  onChange={handleTestChange}></input>
              </div>
              <input type='submit' className='AddButton' value='Add' />
            </form>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
