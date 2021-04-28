import React, { useState, useEffect } from "react";
import "./VaccineDetails.css";
import DownloadSVG from "../../Icons/download.svg";
import EditSVG from "../../Icons/edit.svg";
import Modal from "../Modal/Modal";
import moment from "moment";
import axios from "axios";
export default function VaccineDetails({ selectedUser }) {
  const [ShowVaccineModal, setShowVaccineModal] = useState(false);
  const [userArray, setUserArray] = useState();
  // click Handler to Edit  vaccine details
  const editHandler = () => {
    const tempVaccineShowModal = ShowVaccineModal;
    setShowVaccineModal(!tempVaccineShowModal);
  };
  const handleChange = () => {};

  // click Handler to close  vaccine details Modal
  const clickPlusHandler = () => {
    const tempVaccineShowModal = ShowVaccineModal;
    setShowVaccineModal(!tempVaccineShowModal);
  };
  // useEffect to fetch Vaccination Database
  useEffect(() => {
    axios
      .get(`http://lulu.transituae.net/api/vaccinelist/${selectedUser.id}`)
      .then((response) => {
        setUserArray(response.data);
      })
      .catch((err) => console.error(err));
  }, [selectedUser]);

  //
  return (
    <div className='vaccine-dose-wrapper'>
      {userArray &&
        userArray.map((vaccine) => (
          <div className="row" >
            {/*  style={{display:"flex",alignContent: 'space-between',width:'100%'}} */}
            <h1 className='vaccine-dose-label '>{vaccine.vaccine_dose}</h1>
            <h1 className='vaccine-dose-date'>{vaccine.vaccine_date}</h1>
            <a href={vaccine.attachments} download>
            <img
              src={DownloadSVG}
              alt=''
              className='vaccine-dose-download-attachment'
            />
            </a>
            <img
              src={EditSVG}
              alt=''
              className='vaccine-dose-edit scale'
              onClick={editHandler}
            />
          </div>
        ))}

      {ShowVaccineModal ? (
        <Modal onClick={clickPlusHandler} >
          <div className='vaccine'>
            <form className='addform'>
              {/*  onSubmit={submitData} */}
              <h3 className='emplist__name empVaccine--text'>
                Vaccination Details
              </h3>

              <div className='form_box'>
                <label className='EmpSetailsText'>
                  {selectedUser &&
                  !Object.prototype.hasOwnProperty.call(
                    selectedUser,
                    "vaccine_dose"
                  )
                    ? "First"
                    : "Second"}{" "}
                  Dose:
                </label>
                <input
                  type='date'
                  placeholder='First Dose'
                  name='First_Dose'
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
                // ref={fileRef}
                onChange={handleChange}></input>
              <input type='submit' className=' regSubButton' value='Add' />
            </form>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
