import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../../component/UI/Header/Header";
import { useSelector } from "react-redux";
import "./Settings.css";
import SettingsIcon from "../../../component/Icons/house.svg";
import TableComponent from "../../../component/TableComponent/TableComponent";

import AddNewUserIcon from "../../../component/UI/AddUser/AddUser";

export default function Settings() {
  const history = useHistory();
  const [userArray, setUserArray] = useState([]);
  const userDetails = useSelector((state) => state.isAuth);

  const clickBackHandler = () => {
    history.push("/");
  };

  return (
    <div>
      <Header>
        {userDetails.is_admin ? (
          <img
            className='Admin_Home_icon'
            title='Back'
            src={SettingsIcon}
            onClick={clickBackHandler}
            alt=''
          />
        ) : null}
      </Header>
      <div className='body'>
        <div className='table-style'>
          <TableComponent />
        </div>
      </div>
      <div>
        <div>
          {userDetails.is_admin ? (
            <AddNewUserIcon userArray={userArray} setUserArray={setUserArray} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
