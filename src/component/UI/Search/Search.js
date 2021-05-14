import React from "react";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import axiosInstance from '../../../axios'
import { empAddUpdateAction } from "../../../store/empAddUpdate";
// var filteredElements = [];
export default function Search({ userArray, setUserArray, setMount }) {
  
  const dispatch = useDispatch();
  let cancelToken;
  // const searchRef = React.useRef();
  // var oldData = userArray;
  // const handleChange = () => {
  //   filteredElements = userArray.filter((e) =>
  //     e.name.toLowerCase().includes(searchRef.current.value.toLowerCase())
  //   );
  //   if (searchRef.current.value.length === 0) {
  //     setMount(true);
  //   } else {
  //     setUserArray(filteredElements);
  //   }
  // };
  const handleSearch = (e) => {
    let searchTerm = e.target.value;
    if (searchTerm.length === 0) {
      dispatch(empAddUpdateAction.added());
    } else {
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Cancelled");
      }
      cancelToken = axios.CancelToken.source();
      axiosInstance({
        method: "GET",
        url: `/api/emplist/?search=${searchTerm}`,
        cancelToken: cancelToken.token,
      }).then((res) => {
        setUserArray(res.data);
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
      <a className="search-btn">
        <i className="fas fa-search"></i>
      </a>
    </div>
  );
}
