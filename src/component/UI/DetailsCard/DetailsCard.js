import React,{useState,useEffect} from "react";
import "./DetailsCard.css";
import Plus from "../../Icons/plus.svg";
import Modal from "../Modal/Modal";
import moment from "moment";
import axios from "axios";

export default function DetailsCard(props) {
  


  const [ShowVaccineModal, setShowVaccineModal] = useState(false);
 
  // click Handler to Edit  vaccine details
  const  DetailsCardHandler = () => {
    const tempVaccineShowModal = ShowVaccineModal;
    setShowVaccineModal(!tempVaccineShowModal);
  };
  const handleChange = () => {};

  // click Handler to close  vaccine details Modal
  const clickPlusHandler = () => {
    const tempVaccineShowModal = ShowVaccineModal;
    setShowVaccineModal(!tempVaccineShowModal);
  };
  return (
    <div className='detail-card'>
      <div className='detail-card-header'>
        <h3 className='detail-card-header__title'>{props.detailType}</h3>
        <img className='detail-card-header__plus_icon' src={Plus} alt='' onClick={DetailsCardHandler}/>
      </div>
      {ShowVaccineModal ? (
        <Modal onClick={clickPlusHandler} >
          <div className='vaccine'>
            <form className='addform'>
              {/*  onSubmit={submitData} */}
              <h3 className='emplist__name empVaccine--text'>
                Vaccination Details
              </h3>

              <div className='form_box'>
                {/* <label className='EmpSetailsText'>
                  {selectedUser &&
                  !Object.prototype.hasOwnProperty.call(
                    selectedUser,
                    "vaccine_dose"
                  )
                    ? "First"
                    : "Second"}{" "}
                  Dose:
                </label> */}
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
      {props.children}
    </div>
  );
}
