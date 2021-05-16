import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./component/UI/Header/Header";
import Register from "./component/Register/Register";
import AddUser from "./component/AddUser/AddUser";
import Search from "./component/UI/Search/Search";
import SignUp from "./component/SignUp/SignUp";
import SignIn from "./component/SignIn/SignIn";
import EmpList from "./component/EmpList/EmpList";
import ProtectedRoute from "./ProtectedRoute";
import Error404 from "./component/UI/Error404";
import Sidebar from "./component/UI/Sidebar/Sidebar";
import {useHistory,Redirect} from "react-router-dom";
import { isAuth } from "./store/isAuthenticated";
import { useDispatch } from "react-redux";
export default function Routes() {
  const [userArray, setUserArray] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
 

  return (
    <div>
      <Switch>
        <ProtectedRoute path="/" exact>
          <Header>
            <Search userArray={userArray} setUserArray={setUserArray} />
            <AddUser />
            {/* <Sidebar/> */}
          </Header>
          <div className="body">
            <EmpList userArray={userArray} setUserArray={setUserArray} />
          </div>
        </ProtectedRoute>
        <Route path="/login" component={SignIn} />
        <Route path="/register/:string" component={SignUp} />
        <Route path="*" component={Error404} />
      </Switch>
    </div>
  );
}
