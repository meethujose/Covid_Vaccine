import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { isAuth } from "../../store/isAuthenticated";
import Modal from "../UI/Modal/Modal";
import getAxiosInstance from "../../axiosInstance";
import { userDataUpdateAction } from "../../store/userData";
import { empAddUpdateAction } from "../../store/empAddUpdate";

export default function EditVaccine({ setEditVaccineModal, EditVaccineModal }) {
  const dispatch = useDispatch();
  const labelRef = React.useRef();
  const [formData, setFormData] = useState({});
  const [userVaccineData, setUserVaccineData] = useState([]);
  const useraddedData = useSelector((state) => state.userData[0]);
  console.log("userRedux state", useraddedData);


  // form data handling

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  // to show vaccine modal

  const DetailsCardHandler = () => {
    setEditVaccineModal(!EditVaccineModal);
  };

  // submit vaccine data

  const submitData = async (e) => {
    e.preventDefault();
    console.log("testing", useraddedData);
    const dose = useraddedData.first_dose
      ? "second_dose"
      : useraddedData.second_dose
      ? "second_dose"
      : "first_dose";
    if (useraddedData) {
      getAxiosInstance().then(async (axiosInstance) => {
        await axiosInstance
          .put("userapi/selfvaccine/", {
            first_dose: dose === "first_dose" ? true : useraddedData.first_dose,
            first_dose_date:
              dose === "first_dose"
                ? formData.Dose_Date
                : useraddedData.first_dose_date,
            // first_dose_details:  dose==='first_dose'?formData.myfile:useraddedData.first_dose_details,
            second_dose:
              dose === "second_dose" ? true : useraddedData.second_dose,
            second_dose_date:
              dose === "second_dose"
                ? formData.Dose_Date
                : useraddedData.second_dose_date,
            second_dose_details:
              dose === "second_dose"
                ? formData.myfile
                : useraddedData.second_dose_details,
            // attachments: formData.myfile,
            // name: selectedUser.id,
          })
          .then(function (response) {
            console.log(response.data);
            dispatch(empAddUpdateAction.added());   
            dispatch(userDataUpdateAction.add([{ ...response.data }]));
            console.log(response);
            formData.Dose_Date = "";
            formData.Remarks = "";

            setEditVaccineModal(!EditVaccineModal);
          })
          .catch((err) => {
            console.log("vaccine update failed", err);
          });
      });
    }
  };
  return (
    <div>
      <Modal onClick={DetailsCardHandler}>
        <div className='vaccine'>
          <form className='addform' onSubmit={submitData}>
            <h3 className='emplist__name empVaccine--text'>
              Vaccination Details
            </h3>
            <div>{userVaccineData}</div>
            <div className='form_box'>
              <label className='EmpSetailsText' ref={labelRef}>
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
    </div>
  );
}
