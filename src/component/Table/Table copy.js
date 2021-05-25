import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../UI/Header/Header";
import getAxiosInstance from "../../axiosInstance";
import SettingsIcon from "../Icons/house.svg";
import AddUserIcon from "../Icons/plus.svg";
import "./Table.css";
function Table() {
  let filteredElements = [];
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [temp, setTemp] = useState([]);
  const clickHandler = () => {
    const tempShowModal = showModal;
    setShowModal(!tempShowModal);
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    getAxiosInstance().then(async (axiosInstance) => {
      await axiosInstance
        .get("userapi/accounts/")
        .then((res) => {
          setUserData(res.data);
          setTemp(res.data);
          console.log(res.data);
        })
        .catch((err) => console.error(err));
    });
  };
  // user data change
  useEffect(() => {
    console.log("userData effect:", userData);
    return () => {};
  }, [userData]);
  const clickBackHandler = () => {
    history.push("/");
  };

  return (
    <div style={{ overflow: " hidden" }}>
      <div className='tbl_body'>
        <div className='tbl_header_wrapper'>
          {" "}
          <img
            className='tbl_Backicon'
            title='Back'
            src={SettingsIcon}
            onClick={clickBackHandler}
            alt=''
          />
        </div>
        <img
            className='addusericon'
            // onClick={animation_on_plusIcon}
            src={AddUserIcon}
            alt=''
          />
        <div class='table-users'>
          <div class='tableheader'>Users</div>
          <table cellspacing='0'>
            <tr>
              <th></th>
              <th>c</th>
              <th>EmiratesID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Vaccine_status</th>
              <th>Test Status</th>
              <th>Status</th>
            </tr>
            {userData.map((item, index) => (
              <tr>
                <td>
                  <img
                    src={item.avatar}
                    alt=''
                  />
                </td>
                <td>{index + 1}</td>
                <td>{item.emiratesID}</td>
                <td>{item.first_name}</td>
                <td> {item.last_name}</td>
                <td>
                  {" "}
                  {!item.first_dose && !item.second_dose
                    ? "Not vaccinated"
                    : item.first_dose && !item.second_dose
                    ? "first Dose"
                    : "Second Dose"}
                </td>
                <td>
                  {item.tests.length === 0
                    ? "NA"
                    : (item.tests.length - 1).test_result}
                </td>
                <td>Invited</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
