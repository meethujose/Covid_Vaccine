import "./App.css";
import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Routes from "./Routes";
import dayjs from 'dayjs';
import axios from 'axios';
import getRefreshToken from './getRefreshToken'
function App() {
  axios.interceptors.request.use(async (config) => {
    const expireAt = localStorage.getItem('token_expiry');
    let token = localStorage.getItem('access_token');
    if (dayjs(expireAt).diff(dayjs()) < 1) {
       token = getRefreshToken();  
       console.log("new token");  
    }
    // setting updated token
    localStorage.setItem('access_token', token);
    return config;
  }, (err) => {
     console.log("error in getting ",err)
  });

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
