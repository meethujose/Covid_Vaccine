import axios from "axios";
import jwt_decode from "jwt-decode";

const baseURL = "http://lulu.transituae.net/";

export const axiosInstancetemp = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
  },
});

const axiosInstance = () => {
  const tokenExpiry = localStorage.getItem("token_expiry") * 1000;
  console.log('from axios instance' , tokenExpiry > Date.now())
  if (tokenExpiry < Date.now()) {
    const refreshToken = localStorage.getItem("refresh_token");
    const url = "api/token/refresh/";
      axios
        .post(url, {
          refresh: refreshToken,
        })
        .then(function (response) {
          // return response.data.access;
          localStorage.setItem("access_token", response.data.access);
          const decoded = jwt_decode(response.data.access)
          localStorage.setItem("token_expiry", decoded.exp);
        })
      } 
  return axiosInstancetemp;
};

export default axiosInstance();
