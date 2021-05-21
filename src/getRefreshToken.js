import axios from "axios";

const baseURL = "http://lulu.transituae.net/";

export const getRefreshToken = async ()=>{
    let token = localStorage.getItem("refresh_token");
     await  axios.post(baseURL+"api/token/refresh/", {
        refresh: token
      })
      .then(function (response) {   
        // return response.data.access;
       localStorage.setItem("access_token",response.data.access);
      })
      .catch(function (error) { 
        console.log(error);
      })
    }

export default getRefreshToken;