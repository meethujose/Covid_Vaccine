import "./App.css";
import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Routes from "./Routes";
// import dayjs from 'dayjs';
// import axios from 'axios';
// import getRefreshToken from './getRefreshToken'

function App() {
//  getRefreshToken();

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
