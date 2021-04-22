import React from "react";
import "./Register.css";
import db, { storage } from "../../Data/FirebaseConfig";
import user from "../Images/user.png";

export default function Register({ setShowModal }) {
  const imageRef = React.useRef();
  const [formData, setFormData] = React.useState({});
  const [EidField, setEidField] = React.useState("");
  const [image, setImage] = React.useState(null);
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitData = async (e) => {
    e.preventDefault();
    //image upload

    console.log("clicked");
    var image = imageRef.current.files[0];
    var storageRef = storage.ref().child(`images/${image.name}`).put(image);

    storageRef.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then(async(url) => {
          console.log(url);
          const res = await db.collection("users").add({
            name: formData.username,
            number: formData.PhoneNumber,
            eid: formData.EmiratesId,
            Avatar: url,
          });
          formData.username = "";
          formData.PhoneNumber = "";
          formData.EmiratesId = "";
          setShowModal(false);
        });
      }
    );
    //

   
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
        if (x == 3 || x == 7 || x == 14) {
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
    <div className='register'>
      <label>
        <input
          type='file'
          id='file'
          name='image'
          required
          ref={imageRef}></input>
        <img src={user} className='imgFile' />
      </label>
      <form className='addform' onSubmit={submitData}>
        <div className='form_box'>
          <label>Name</label>
          <input
            type='text'
            placeholder='Name'
            name='username'
            required
            className='inputField'
            onChange={handleChange}
          />
        </div>
        <div className='form_box'>
          <label>EID No.</label>
          <input
            type='text'
            placeholder='Phone Number'
            name='PhoneNumber'
            required
            className='inputField'
            onChange={handleChange}
          />
        </div>
        <div className='form_box'>
          <label>Mobile No.</label>
          <input
            type='text'
            placeholder='Emirates Id'
            name='EmiratesId'
            required
            className='inputField'
            onChange={(e) => {
              EidChangeHandler(e);
              handleChange(e);
            }}
            value={EidField}
          />
        </div>
        <input
          type='submit'
          className=' regSubButton'
          value='Submit'
        />
      </form>
    </div>
  );
}
