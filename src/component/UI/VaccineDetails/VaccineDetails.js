import React, { useState, useEffect } from "react";
import { storage } from "../../../Data/FirebaseConfig";
import "./VaccineDetails.css";
import DownloadSVG from "../../Icons/download.svg";
import EditSVG from "../../Icons/edit.svg";
import CancelSVG from "../../Icons/cancel.svg";
import Modal from "../Modal/Modal";
import moment from "moment";
import getAxiosInstance from "../../../axiosInstance";
import { useSelector,useDispatch } from "react-redux";
import { vaccineAddUpdateAction } from "../../../store/vaccineAddUpdate";
export default function VaccineDetails({
  selectedUser,
  userVaccineData,
  setUserVaccineData,

}) {
  const fileRef = React.useRef();
  const dispatch = useDispatch();
  const vaccineAddUpdateState = useSelector((state) => state.vaccine);
  const [ShowVaccineModal, setShowVaccineModal] = useState(false);
  const [editModalStatus, setEditModalStatus] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedVaccine, setSelectedVaccine] = useState({});
  const editModalHandler = () => {
    const tempEditShowModal = editModalStatus;
    setEditModalStatus(!tempEditShowModal);
  };

  const editVaccineData = (data) => {
    setEditModalStatus(true);
    setSelectedVaccine(data);
  };

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  // send api request
  const sendEditRequest = async (data) => {
    getAxiosInstance().then(async axiosInstance=>{
    await axiosInstance
      .put(
        `api/vaccinerud/${selectedVaccine.id}`,
        data
      )
      .then(function (response) {
        dispatch(vaccineAddUpdateAction.added());
        console.log("edit response: ", response);
      })
     
      setEditModalStatus(false);
    });
  };
  // function edit
  const editVaccineDetails = async (e) => {
   
    e.preventDefault();
    //image upload

   if (fileRef.current && fileRef.current.files[0]) { 
      var file = fileRef.current.files[0];
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
            const data = {
              vaccine_dose:
              selectedUser &&
               userVaccineData &&
            userVaccineData.length === 0
                  ? "First"
                  :(selectedUser &&
                   userVaccineData &&userVaccineData[0].vaccine_dose ==="First")?
                  "Second":"First",
              vaccine_date: formData.vaccine_date
                ? formData.vaccine_date
                : selectedVaccine.vaccine_date,
              remarks: formData.remarks
                ? formData.remarks
                : selectedVaccine.remarks,
              attachments: url,
              name: selectedUser.id,
            };
            sendEditRequest(data);

            formData.First_Dose = "";
            formData.Remarks = "";

            setShowVaccineModal(false);
          });
        }
      );
    } else {
      // alert("Image not selected");
      const data = {
        vaccine_dose:
          userVaccineData && userVaccineData.length === 1 ? "Second" : "First",
        vaccine_date: formData.vaccine_date
          ? formData.vaccine_date
          : selectedVaccine.vaccine_date,
        remarks: formData.remarks ? formData.remarks : selectedVaccine.remarks,
        attachments: selectedVaccine.attachments,
        name: selectedUser.id,
      };
      sendEditRequest(data);
    }
  };

  useEffect(() => {
    getAxiosInstance().then(async axiosInstance=>{
    axiosInstance
      .get(`api/vaccinelist/${selectedUser.id}`)
      .then((response) => {
        setUserVaccineData(response.data);
      })
      .catch((err) => console.error(err));
    });
  }, [selectedUser,vaccineAddUpdateState]);

  // delete Vaccine details
const deleteVaccineData=async(data)=>{
 
  console.log(data);
  getAxiosInstance().then(async axiosInstance=>{
  await axiosInstance
  .delete(
    `api/vaccinerud/${data.id}`,
    
  )
  .then(function (response) {
    dispatch(vaccineAddUpdateAction.added());
    console.log("delete response: ", response);
  })
  .catch((error) => {
    console.log("delete failed ", error);
  });
});
}
  return (
    <div className='vaccine-dose-wrapper'>
      {userVaccineData &&
        userVaccineData.map((vaccine) => (
          <div className='row'>
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
              onClick={() => editVaccineData(vaccine)}
            />
              <img
              src={CancelSVG}
              alt=''
              className='vaccine-dose-edit scale'
              onClick={() => deleteVaccineData(vaccine)}
            />
          </div>
        ))}

      {/* Edit vaccine details */}
      {editModalStatus ? (
        <Modal onClick={editModalHandler}>
          <div className='vaccine'>
            <form className='addform' onSubmit={editVaccineDetails}>
              <h3 className='emplist__name empVaccine--text'>
                Edit Vaccination Details
              </h3>

              <div className='form_box'>
                <label className='EmpSetailsText'>
               Date:
                </label>

                <input
                  type='date'
                  placeholder='First Dose'
                  name='vaccine_date'
                  required
                  defaultValue={selectedVaccine.vaccine_date}
                  className='EditinputField'
                  onChange={handleChange}
                  max={moment().utc().format("YYYY-MM-DD")}
                />
              </div>
              <div className='form_box'>
                <label className='EmpSetailsText'>Remarks:</label>
                <input
                  type='text'
                  placeholder='Remarks'
                  name='remarks'
                  required
                  defaultValue={selectedVaccine.remarks}
                  className='EditinputField'
                  onChange={handleChange}
                />
              </div>
              <div className='form_box'>
              <label className='EmpSetailsText'>Attachment:</label>
              <input
                type='file'
                id='myfile'
                name='myfile'
                // ref={fileRef}
                onChange={handleChange}></input>
                </div>
              <input type='submit' className=' EditButton' value='Add' />
            </form>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
