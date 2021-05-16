import "./App.css";
import React from "react";
import { BrowserRouter as Router,Redirect} from "react-router-dom";
import Routes from "./Routes";

import { isAuth } from "./store/isAuthenticated";
import { useDispatch, useSelector } from "react-redux";
function App() {
 

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
