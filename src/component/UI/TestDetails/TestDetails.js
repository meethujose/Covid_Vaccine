import React, { useEffect, useState } from "react";
import "./TestDetails.css";
import axios from "axios";
import DownloadSVG from "../../Icons/download.svg";
import EditSVG from "../../Icons/edit.svg";

export default function VaccineDetails({ selectedUser }) {
  const [userTestDetails, setUserTestDetails] = useState([]);
  // useEffect to fetch Vaccination Database
  useEffect(() => {
    axios
      .get(`http://lulu.transituae.net/api/testresultlist/${selectedUser.id}`)
      .then((response) => {
        // setUserArray(response.data);
        setUserTestDetails(response.data);
      })
      .catch((err) => console.error(err));
  }, [selectedUser]);
  return (
    <div className='test-wrapper'>
      {userTestDetails &&
        userTestDetails.map((test) => (
          <div className='row'>
            <h1 className='test-label '>{test.test_result}</h1>
            <h1 className='test-date'>{test.test_date}</h1>
            <img
              src={DownloadSVG}
              alt=''
              className='test-download-attachment'
            />
            <img src={EditSVG} alt='' className='test-edit' />
          </div>
        ))}
    </div>
  );
}
