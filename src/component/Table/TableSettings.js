import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../UI/Header/Header";
import getAxiosInstance from "../../axiosInstance";
import SettingsIcon from "../Icons/house.svg";
import AddUserIcon from "../Icons/plus.svg";
import "./Table.css";
import Modal from "../UI/Modal/Modal";
import Register from "../Register/Register";
import 'antd/dist/antd.css';
import { Table } from 'antd';
function TableSettings() {
  let filteredElements = [];
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [temp, setTemp] = useState([]);
  const clickHandler = () => {
    const tempShowModal = showModal;
    setShowModal(!tempShowModal);
  };
  const clickAddUserHandler = () => {
    setShowRegisterModal(!showRegisterModal);
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
  let tempData = [];
  userData.map((value, index) =>{
    let obj = {}
    obj['email'] = value.email
    obj['emiratesID'] = value.emiratesID
    obj['first_name'] = value.first_name
    obj['last_name'] = value.last_name
    obj['vaccine_dose'] =(!value.first_dose && !value.second_dose)? "Not vaccinated" : (value.first_dose && !value.second_dose)  ? "first Dose"    : "Second Dose"
   
    tempData.push(obj)
  })

  const columns = [
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'emiratesID',
      dataIndex: 'emiratesID',
      key: 'emiratesID',
    },
    {
      title: 'first_name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'last_name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'vaccine_dose',
      dataIndex: 'vaccine_dose',
      key: 'vaccine_dose',
    },
    {
      title: 'vaccine_dose',
      dataIndex: 'vaccine_dose',
      key: 'vaccine_dose',
    },
  ];




  return (
    <div style={{ overflow: " hidden" }}>
      <div className='tbl_body'>
        <div>
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
            onClick={clickHandler}
            src={AddUserIcon}
            alt=''
          />
           {showModal ? (
          <Modal onClick={clickHandler} className='wrapper'>
            <Register setshowModal={setShowModal} />
          </Modal>
        ) : null}


<Table dataSource={tempData} columns={columns} />;


        {/* <div class='table-users'>
          <div class='tableheader'>Users</div>
          <table cellspacing='0'>
            <tr>
              <th></th>
              <th>Sl No</th>
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
        </div> */}







      </div>
    </div>
  );
}

export default TableSettings;
