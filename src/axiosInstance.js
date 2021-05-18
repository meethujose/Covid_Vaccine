import axios from "axios";

const baseURL = "http://lulu.transituae.net/";

export const getAxiosInstance = async ()=>{
  let at = await localStorage.getItem("access_token");
  if(at) {

  }
  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization:at
        ? "Bearer " + at
        : null,
    },
  });
}

export default getAxiosInstance;

