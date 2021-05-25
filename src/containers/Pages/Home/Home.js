import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../../component/UI/Header/Header";
import AdminDropBox from "../../../component/AdminDropBox/AdminDropBox";
import Search from "../../../component/UI/Search/Search";
import EmpList from "../../../component/EmpList/EmpList";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails } from "../../../store/isAuthenticated";
import AvatarCard from "../../../component/AvatarCard/AvatarCard";
import './Home.css';
import TopbarUser from '../../../component/TopbarUser/TopbarUser';
import PlusFilterIcon from '../../../component/UI/PlusIcon/PlusIcon';
import SettingsIcon from "../../../component/Icons/gear.svg";
export default function Home() {

  const history = useHistory();
  const [userArray, setUserArray] = useState([]);
  const userDetails = useSelector((state) => state.isAuth)
  // console.log('from home',userDetails)
  const settingsHandler = () => {
    history.push("/settings");
  };

  return (
    <div>  
      <Header>
      { userDetails.is_admin ? <img
          className='Admin_settings_icon'
          src={SettingsIcon}
          onClick={settingsHandler}
          alt=''
          title='Invite User'
          data-toggle='tooltip'
          data-placement='bottom'
        /> : null }
      { userDetails.is_admin ? <Search userArray={userArray} setUserArray={setUserArray} /> : null }

        <TopbarUser avatar = {userDetails.avatar}
                    name = {userDetails.first_name + ' ' + userDetails.last_name}
                    email = {userDetails.email}/>
      </Header>
      <div className='body'>
        <EmpList userArray={userArray} setUserArray={setUserArray} />
      </div>
      <div>
      { userDetails.is_admin ? <PlusFilterIcon userArray={userArray} setUserArray={setUserArray} />: null }
      </div>
    </div>
  );
}
