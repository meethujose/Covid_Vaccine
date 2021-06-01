import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Avatar } from "antd";
import user from "../Images/user.png";
import { useHistory } from "react-router-dom";
import axios, { baseURL } from "../../axios";
import { empAddUpdateAction } from "../../store/empAddUpdate";
import { useDispatch, useSelector } from "react-redux";
import "./EditProfile.css";
import EditSVG from "../Icons/edit.svg";
import Loader from "../../component/utility/loader";
import ImageCropper from "../ImageCropper/ImageCropper";
import getAxiosInstance from "../../axiosInstance";
import { addUserDetails } from "../../store/userDetails";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
function EditProfile(props) {
  const [profileData, setProfileData] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const [ShowVaccineModal, setShowVaccineModal] = useState(false);
  const labelRef = React.useRef();
  const imageRef = React.useRef();
  const [selected, setSelected] = useState(false);
  const [profileImage, setProfileImage] = useState(user);
  const [EidField, setEidField] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(true);

  const userData = useSelector((state) => state.userDetails);
  console.log("userData", userData);
  const handleOk = () => {
    props.setEditProfileModal(false);
  };

  const handleCancel = () => {
    props.setEditProfileModal(false);
    setEditProfile(false);
  };

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const DetailsCardHandler = () => {
    props.setEditProfileModal(!props.EditProfileModal);
  };
  const editProfileHandler = () => {
    setEditProfile(!editProfile);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(
      "testvformdata",
      formData.firstname ? formData.firstname : userData.first_name
    );
    console.log("avatar", croppedImage && croppedImage);
    getAxiosInstance().then(async (axiosInstance) => {
      await axiosInstance
        .put("userapi/profile/", {
          first_name: formData.firstname
            ? formData.firstname
            : userData.first_name,
          last_name: formData.last_name
            ? formData.last_name
            : userData.last_name,
          emiratesID: formData.EmiratesId
            ? formData.EmiratesId
            : userData.emiratesID,
          email: formData.email ? formData.email : userData.email,
          avatar: croppedImage ? croppedImage : userData.avatar,
        })
        .then(function (res) {
          // dispatch(
          //   addUserDetails({
          //     first_name: res.data[0].first_name,
          //     last_name: res.data[0].last_name,
          //     user_data: {
          //       emiratesID: res.data[0].emiratesID,
          //       avatar: res.data[0].avatar,
          //     },
          //   })
          // );
          dispatch(empAddUpdateAction.added());
          formData.firstname = "";
          formData.last_name = "";
          formData.EmiratesId = "";
          formData.email = "";
          DetailsCardHandler();
        });
    });
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
    <>
      <Modal
        title='Edit Profile'
        visible={props.modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          // <Button key='back'>Return</Button>,
          <div className='button-wrapper'>
            <div>
              <Button key='editProfile' onClick={editProfileHandler}>
                {editProfile ? "Return" : "Edit Profile"}
              </Button>
            </div>

            <div>
              {editProfile ? (
                <Button key='submit' onClick={submitHandler}>
                  Submit
                </Button>
              ) : null}
            </div>
          </div>,
        ]}>
        <>
          <p>
            <img
              style={{
                display: "block",
                margin: "auto",
                width: "10rem",
                height: "10rem",
                borderRadius: "100%",
                padding: "3px",
                border: "3px solid #858b94",
              }}
              alt=''
              src={
                croppedImage
                  ? croppedImage
                  : userData && userData.user_data && userData.user_data.avatar
              }
            />
          </p>
          {editProfile ? (
            <div>
              <form>
                <ImageCropper
                  setCropppedImage={setCroppedImage}
                  hidden={true}
                />
                <div class='row'>
                  <div class='col'>
                    <input
                      type='text'
                      placeholder='First Name'
                      name='firstname'
                      style={{ padding: "10px", marginTop: "20px" }}
                      className='form-control form-control-sm'
                      onChange={handleChange}
                      defaultValue={userData.first_name}
                    />
                  </div>
                  <div class='col'>
                    <input
                      type='text'
                      placeholder='Last Name'
                      name='lastname'
                      style={{ padding: "10px", marginTop: "20px" }}
                      className='form-control form-control-sm'
                      onChange={handleChange}
                      defaultValue={userData.last_name}
                    />
                  </div>
                </div>

                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  style={{ padding: "10px", marginTop: "20px" }}
                  className='form-control form-control-sm'
                  onChange={handleChange}
                  defaultValue={userData.user_data.email}
                />
                <input
                  type='text'
                  placeholder='Emirates Id'
                  name='EmiratesId'
                  style={{ padding: "10px", marginTop: "20px" }}
                  className='form-control form-control-sm'
                  defaultValue={
                    userData.user_data.emiratesID
                      ? userData.user_data.emiratesID
                      : EidField
                  }
                  onChange={(e) => {
                    EidChangeHandler(e);
                    handleChange(e);
                  }}
                />
              </form>
            </div>
          ) : (
            <div
              className='h6'
              style={{
                textAlign: "center",
              }}>
              <p>
                {userData && userData.first_name}{" "}
                {userData && userData.last_name}
              </p>
              <p>
                {" "}
                {userData && userData.user_data && userData.user_data.email}
              </p>
              <p>
                EmiratesID :{" "}
                {userData &&
                  userData.user_data &&
                  userData.user_data.emiratesID}
              </p>
            </div>
          )}
        </>
      </Modal>
    </>
    // <div>
    //   <Modal onClick={DetailsCardHandler}>
    //     <div className='register'>
    //       <label>
    //         <input
    //           type='file'
    //           id='file'
    //           name='image'
    //           ref={imageRef}
    //           onChange={onSelectFile}></input>
    //         <img src={profileImage} className='imgFile' alt={profileImage} />
    //       </label>

    //       <form className='addform' onSubmit={submitData}>
    //         <div className='form_box'>
    //           <label>First Name</label>
    //           <input
    //             type='text'
    //             placeholder='First Name'
    //             name='firstname'
    //             className='form-control'
    //             onChange={handleChange}
    //             defaultValue={userData.first_name}
    //           />
    //         </div>
    //         <div className='form_box'>
    //           <label>Last Name</label>
    //           <input
    //             type='text'
    //             placeholder='Last Name'
    //             name='lastname'
    //             className='reginputField'
    //             onChange={handleChange}
    //             defaultValue={userData.last_name}
    //           />
    //         </div>
    //         <div className='form_box'>
    //           <label>Email</label>
    //           <input
    //             type='email'
    //             placeholder='Email'
    //             name='email'
    //             className='reginputField'
    //             onChange={handleChange}
    //             defaultValue={userData.email}
    //           />
    //         </div>
    //         <div className='form_box'>
    //           <label>Emirates Id</label>
    //           <input
    //             type='text'
    //             placeholder='Emirates Id'
    //             name='EmiratesId'
    //             defaultValue={
    //               userData.emiratesID ? userData.emiratesID : EidField
    //             }
    //             className='reginputField'
    //             onChange={(e) => {
    //               EidChangeHandler(e);
    //               handleChange(e);
    //             }}
    //           />
    //         </div>
    //         <input type='submit' className=' regButton' value='Submit' />
    //       </form>
    //     </div>
    //   </Modal>
    // </div>
  );
}

export default EditProfile;
