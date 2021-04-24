import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SignIn.css";
import db from "../../Data/FirebaseConfig";
import Modal from "../UI/Modal/Modal";
import firebase from "firebase";

import { auth } from "../../Data/FirebaseConfig";

export default function SignIn() {
  const history = useHistory();
  const [error, setError] = useState();
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

    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(formData.userEmail, formData.userPassword);
      if (res.user) {
        history.replace("/");
      }
    } catch (error) {
      setError("Invalid");
    }
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
        {error ? <small style={{ color: "red" }}>{error}</small> : null}
      </div>
    </Modal>
  );
}
