import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./component/UI/Header/Header";
import UserDropDown from "./component/UserDropDown/UserDropDown";
import Search from "./component/UI/Search/Search";
import SignUp from "./component/SignUp/SignUp";
import SignIn from "./component/SignIn/SignIn";
import EmpList from "./component/EmpList/EmpList";
import ProtectedRoute from "./ProtectedRoute";
import Error404 from "./component/UI/Error404";
import Settings from "./component/Settings/Settings";
import Admin from './component/Admin/Admin';
import EmpRegistration from './component/UI/EmpRegistration/EmpRegistration';
import UserVaccineEdit from  './component/UI/UserVaccineEdit/UserVaccineEdit';
export default function Routes() {
  const [userArray, setUserArray] = useState([]);
  return (
    <div>
      <Switch>
        <ProtectedRoute path='/' exact>
          <Header>
            <UserDropDown userArray={userArray} setUserArray={setUserArray}/>
          </Header>
          <div className='body'>
              <EmpList userArray={userArray} setUserArray={setUserArray} />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path='/Admin' >
          <Admin/>
        </ProtectedRoute>
        <Route path='/Settings' component={Settings} />
        <Route path='/VaccineEdit' component={UserVaccineEdit} />
        <Route path='/AddUser' component={EmpRegistration} />
        <Route path='/login' component={SignIn} />
        <Route path='/register/:string' component={SignUp} />
        <Route path='*' component={Error404} />
      </Switch>
    </div>
  );
}
