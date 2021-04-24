import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SignUp.css";
import firebase from 'firebase';

import {auth} from "../../Data/FirebaseConfig"
import Modal from "../UI/Modal/Modal";
export default function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  const SignupHandler = async (e) => {
    e.preventDefault();

    // const res = await db.collection("Authentication").add({
    //   Email: formData.userEmail,
    //   Password: formData.userPassword,
    // });
 
        const resp = await firebase.auth().createUserWithEmailAndPassword(formData.userEmail, formData.userPassword);
       
        history.replace("/login");
    
   
  };
  return (
    <Modal>
      <div className="register">
        <form className="addform" onSubmit={SignupHandler}>
          <div className="form_box">
            <label>Email id</label>
            <input
              type="email"
              placeholder="E.g: faruq123@gmail.com"
              name="userEmail"
              required
              value={formData.userEmail || ""}
              id="userEmail"
              className="inputField"
              onChange={handleChange}
            />
          </div>
          <div className="form_box">
            <label>Password</label>
            <input
              type="password"
              placeholder="Your Password"
              name="userPassword"
              required
              value={formData.userPassword || ""}
              className="inputField"
              id="userPassword"
              onChange={handleChange}
            />
          </div>

          <input type="submit" className=" regSubButton" value="SignUp" />
        </form>
      </div>
    </Modal>
  );
}
