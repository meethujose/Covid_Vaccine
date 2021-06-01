import React, { useEffect, useState } from "react";
import { storage } from "../../../Data/FirebaseConfig";
import "./TestDetails.css";
import Modal from "../Modal/Modal";
import DownloadSVG from "../../Icons/download.svg";
import EditSVG from "../../Icons/edit.svg";
import CancelSVG from "../../Icons/cancel.svg";
import getAxiosInstance from "../../../axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { testAddUpdateAction } from "../../../store/testResult";

export default function VaccineDetails({
  selectedUser,
  setAddTestData,
  addTestData,
}) {
  const fileRef = React.useRef();
  const dispatch = useDispatch();
  const testResultAddUpdateState = useSelector((state) => state.testResult);
  const [editModalStatus, setEditModalStatus] = useState(false);
  const [userTestDetails, setUserTestDetails] = useState([]);
  const [ShowTestResultModal, setShowTestResultModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState({});
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState();
  const [mount, setMount] = useState(true);
  // useEffect to fetch Vaccination Database
  useEffect(() => {
    getAxiosInstance().then(async (axiosInstance) => {
      axiosInstance
        .get("userapi/accounts/")
        .then((response) => {
          setMount(false);
          console.log("selected user test details", selectedUser.tests);
          setUserTestDetails(selectedUser.tests);
        })
        .catch((err) => console.error(err));
    });
  }, [selectedUser, mount, testResultAddUpdateState]);
  // handleChange Event
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  const editModalHandler = () => {
    setAddTestData(!addTestData);
  };
  const editTestData = (data) => {
    setEditModalStatus(true);
    setSelectedTest(data);
  };

  const addTestResultDetails = async (e) => {
    e.preventDefault();
    var file = fileRef.current.files[0];
    getAxiosInstance().then(async (axiosInstance) => {
      await axiosInstance
        .post("vaccineapi/selftestcreate/", {
          test_result:result,
          test_date:  formData.Test_Date,
          remarks: formData.Remarks,
          atachments: file,
        })
        .then(function (response) {
          console.log("edit response: ", response);
        })
        .catch((error) => {
          console.log("edit failed ", error);
        });
    });
  };

  // delete Test Result Details

  const deleteTestData = async (data) => {
    setMount(true);
    console.log(data);
    getAxiosInstance().then(async (axiosInstance) => {
      await axiosInstance
        .delete(`api/testresultrud/${data.id}`)
        .then(function (response) {
          console.log("delete response: ", response);
        })
        .catch((error) => {
          console.log("delete failed ", error);
        });
    });
  };
  return (
    <div className='test-wrapper'>
      <Modal>
        <div className='vaccine'>
          <form className='addform' onSubmit={addTestResultDetails}>
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
                className='EditTestinputField '
                required
                onChange={(e) => setResult(e.target.value)}>
                <option selected disabled required>Choose an option</option>
                <option value='Negative' className='EditTestinputField '>
                  Negative
                </option>
                <option value='Positive' className='EditTestinputField '>
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
    </div>
  );
}
