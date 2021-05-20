import axios from "axios";

const baseURL = "http://lulu.transituae.net/";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout:5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
  },
});

export default axiosInstance;

