import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./component/UI/Header/Header";

import AddUser from "./component/AddUser/AddUser";
import Search from "./component/UI/Search/Search";
import SignUp from "./component/SignUp/SignUp";
import SignIn from "./component/SignIn/SignIn";
import EmpList from "./component/EmpList/EmpList";
import ProtectedRoute from "./ProtectedRoute";
import Error404 from "./component/UI/Error404";
import Settings from "./component/Settings/Settings";
export default function Routes() {
  const [userArray, setUserArray] = useState([]);
  return (
    <div>
      <Switch>
        <ProtectedRoute path='/' exact>
          <Header>
            {localStorage.getItem("is_admin") === "true"  ? (
              <Search userArray={userArray} setUserArray={setUserArray} />
            ) : null}
            <AddUser userArray={userArray} setUserArray={setUserArray}/>
          </Header>
          <div className='body'>

              <EmpList userArray={userArray} setUserArray={setUserArray} />
      
          </div>
        </ProtectedRoute>
        <Route path='/Settings' component={Settings} />
        <Route path='/login' component={SignIn} />
        <Route path='/register/:string' component={SignUp} />
        <Route path='*' component={Error404} />
      </Switch>
    </div>
  );
}
