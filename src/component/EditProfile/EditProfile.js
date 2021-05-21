import React, { useState } from "react";
import Modal from "../UI/Modal/Modal";
import user from "../Images/user.png";
import { useHistory } from "react-router-dom";
import getAxiosInstance from "../../axiosInstance";
import { empAddUpdateAction } from "../../store/empAddUpdate";
import { useDispatch } from "react-redux";
import  './EditProfile.css';
import EditSVG from "../Icons/edit.svg";
function EditProfile({
  selectedUser,
  userVaccineData,
  setEditProfileModal,
  EditProfileModal,
}) {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const [ShowVaccineModal, setShowVaccineModal] = useState(false);
  const labelRef = React.useRef();
  const imageRef = React.useRef();
  const [selected, setSelected] = useState(false);
  const [profileImage, setProfileImage] = useState(user);
  const [EidField, setEidField] = useState("");
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const DetailsCardHandler = () => {
    setEditProfileModal(!EditProfileModal);
  };
// edit vaccine data

const editVaccineData=()=>{
  history.push("/VaccineEdit");
}
  const currentData = JSON.parse(localStorage.getItem("userData"));
  console.log("current_user", currentData.email);
  const submitData = async (e) => {
    e.preventDefault();
    var image = imageRef.current.files[0];
    console.log("avatar",image);
    getAxiosInstance().then(async (axiosInstance) => {
      await axiosInstance
        .put("userapi/profile/", {
          first_name: formData.firstname
            ? formData.firstname
            : currentData.first_name,
          last_name: formData.last_name
            ? formData.last_name
            : currentData.last_name,
          emiratesID: formData.EmiratesId
            ? formData.EmiratesId
            : currentData.emiratesID,
          email: formData.email ? formData.email : currentData.email,
          avatar:imageRef.current.files[0],
        })
        .then(function (response) {
          console.log("user edit response",userIcon);
          dispatch(empAddUpdateAction.added());
          const userIcon=response.data.avatar;         
          console.log("avatar",userIcon);
          formData.firstname = "";
          formData.last_name = "";
          formData.EmiratesId = "";
          formData.email = "";
          DetailsCardHandler();
        });
    });

    //     })

    //   });
  };
  const onSelectFile = (e) => {
    console.log(imageRef.current.files[0]);
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };
  const EidChangeHandler = (event) => {
    const Eid = event.target.value;
    if (Eid.length < 19) {
      let tempValue = "";
      for (let x in Eid) {
        if (Eid.charAt(x).match(/^[0-9]+$/)) {
          tempValue += Eid.charAt(x);
        }
      }
      let finalValue = "";
      for (let x in tempValue) {
        if (x === 3 || x === 7 || x === 14) {
          finalValue += "-";
          finalValue += tempValue.charAt(x);
        } else {
          finalValue += tempValue.charAt(x);
        }
      }
      setEidField(finalValue);
    }
  };
  return (
    <div>
      <Modal onClick={DetailsCardHandler}>
        <div className='register'>
          <label>
            <input
              type='file'
              id='file'
              name='image'
              ref={imageRef}
              onChange={onSelectFile}></input>
            <img src={profileImage} className='imgFile' alt={profileImage} />
          </label>

          <form className='addform' onSubmit={submitData}>
            <div className='form_box'>
              <label>First Name</label>
              <input
                type='text'
                placeholder='First Name'
                name='firstname'
                className='reginputField'
                onChange={handleChange}
                defaultValue={currentData.first_name}
              />
            </div>
            <div className='form_box'>
              <label>Last Name</label>
              <input
                type='text'
                placeholder='Last Name'
                name='lastname'
                className='reginputField'
                onChange={handleChange}
                defaultValue={currentData.last_name}
              />
            </div>
            <div className='form_box'>
              <label>Email</label>
              <input
                type='email'
                placeholder='Email'
                name='email'
                className='reginputField'
                onChange={handleChange}
                defaultValue={currentData.email}
              />
            </div>
            <div className='form_box'>
              <label>Emirates Id</label>
              <input
                type='text'
                placeholder='Emirates Id'
                name='EmiratesId'
                defaultValue={
                  currentData.emiratesID ? currentData.emiratesID : EidField
                }
                className='reginputField'
                onChange={(e) => {
                  EidChangeHandler(e);
                  handleChange(e);
                }}
              />
            </div>
            <div className="editlabelcontainer">
              <h6 className='editlabel'>Edit Vaccine details</h6> 
              <img
                  src={EditSVG}
                  alt=''
                  className='editlabelicon scale'
                  onClick={() => editVaccineData( selectedUser)}
                />      
            </div>
            <div  className="editlabelcontainer" >
              <h6 className='editlabel'>Edit Test details </h6>    
              <img
                  src={EditSVG}
                  alt=''
                  className='edittestlabelicon scale'
                  // onClick={() => editVaccineData( selectedUser)}
                />        
            </div>
            <input type='submit' className=' regButton' value='Submit' />
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default EditProfile;
