import React, { useState } from "react";
import Modal from "../UI/Modal/Modal";
import user from "../Images/user.png";
import getAxiosInstance from "../../axiosInstance";
import { empAddUpdateAction } from "../../store/empAddUpdate";
import {  useDispatch } from "react-redux";


function EditProfile({
  selectedUser,
  userVaccineData,
  setEditProfileModal,
  EditProfileModal,
}) {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
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

  const currentData=  JSON.parse(localStorage.getItem('userData'));
  console.log("current_user",currentData.email);
  const submitData = async (e) => {
    e.preventDefault();
    console.log("clicked");
    var image = imageRef.current.files[0];
    
    //   var storageRef = storage.ref().child(`images/${formData.EmiratesId}`);
    //   storageRef.put(image).then((snapshot) => {
    //     snapshot.ref.getDownloadURL().then(async (url) => {
    //       imageUrl=url;

    //     }).then(async()=>{
          getAxiosInstance().then(async axiosInstance=>{
            await  axiosInstance
            .put("userapi/profile/", {
              first_name: formData.firstname?formData.firstname:currentData.first_name,
              last_name: formData.last_name?formData.last_name:currentData.last_name,
              emiratesID: formData.EmiratesId?formData.EmiratesId:currentData.emiratesID,      
              email:formData.email?formData.email:currentData.email                  
           })
           .then(function (response) {
             dispatch(empAddUpdateAction.added())        
             console.log(response);
             formData.firstname = "";
             formData.last_name = "";
             formData.EmiratesId = "";
             formData.email=""
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
            <img src={profileImage} className='imgFile' alt='img' />
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
                defaultValue={currentData.emiratesID}
                className='reginputField'
                onChange={(e) => {
                  EidChangeHandler(e);
                  handleChange(e);
                }}
                value={EidField}
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
