import React, { useState } from "react";
import "./AddUser.css";


import userIcon from "../Icons/uprofile.svg";
import SettingsIcon from "../Icons/gear.svg";
import { useDispatch } from "react-redux";
import { isAuth } from "../../store/isAuthenticated";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
// test add user
export default function AddUser() {
  const userAvatar=localStorage.getItem('avatar');
  
  const Admin = localStorage.getItem("user_group") === "admin";
  const dispatch = useDispatch();
  const history = useHistory();
 

  const setLogout = () => {
    dispatch(isAuth());
    localStorage.clear();
    // history.replace("/login");
  };
  const settingsHandler = () => {
    history.push("/Settings");
  };
  return (
    <div className='AddUser'>
      {Admin ? (
        <img
          className='settingsicon'
          src={SettingsIcon}
          onClick={settingsHandler}
          alt=''
          title='Invite User'
          data-toggle='tooltip'
          data-placement='bottom'
        />
      ) : null}

      <div>
        {/* <img
          className='logouticon'
          src={userIcon}
          // onClick={() => setLogout()}
          alt=''
        /> */}
        <div className='logouticon'>
          <div>
            <div>
              <label for='profile2' class='profile-dropdown'>
                <input type='checkbox' id='profile2' />
                <img className="avataricon"src={userAvatar}alt="" />

                <ul>
                  <li>
                    <a href='#'>
                      <i className='mdi mdi-settings'></i>Settings
                    </a>
                  </li>
                  <li>
                    <a href='#' onClick={() => setLogout()}>
                      <i className='mdi mdi-logout'></i>Logout
                    </a>
                  </li>
                </ul>
              </label>
            </div>
          </div>
        </div>
       
      </div>
   
    </div>
  );
}
