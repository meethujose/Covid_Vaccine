import React from "react";
import "./Search.css";
import { useDispatch} from "react-redux";
import axios from 'axios';
import { empAddUpdateAction } from "../../../store/empAddUpdate";
import getAxiosInstance from "../../../axiosInstance";
// var filteredElements = [];
export default function Search({ setUserArray }) {
  
  const dispatch = useDispatch();
  let cancelToken;
 
  const handleSearch = (e) => {
    let searchTerm = e.target.value;
    if (searchTerm.length === 0) {
      dispatch(empAddUpdateAction.added());
    } else {
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Cancelled");
      }
      cancelToken = axios.CancelToken.source();
      getAxiosInstance().then(async axiosInstance=>{
      axiosInstance({
        method: "GET",
        url: `/userapi/accounts/?search=${searchTerm}`,
        cancelToken: cancelToken.token,
      }).then((res) => {
       console.log(res.data)
        setUserArray(res.data);
      });
    });
    }
  };
  return (
    <div className="search-box">
      <input
        className="search-input "
        type="text"
        name=""
        placeholder="Search......"
        onChange={handleSearch}
       
      />
      <a href className="search-btn">
        <i className="fas fa-search"></i>
      </a>
    </div>
  );
}
