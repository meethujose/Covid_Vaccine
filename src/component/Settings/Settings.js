import React, { useState, useEffect } from "react";
import "./Settings.css";
import inviteIcon from "../Icons/invite.svg";
import Modal from "../../component/UI/Modal/Modal";
import AddIcon from "../Icons/AddUser.svg";
import Register from "../Register/Register";
import getAxiosInstance from "../../axiosInstance";
import DetailsCard from "../UI/DetailsCard/DetailsCard";

let temp = [];
let filteredElements = [];

function Settings() {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
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
          temp = res.data;
          console.log(res.data);
        })
        .catch((err) => console.error(err));
    });
  };
  const handleFilter = (e) => {
    switch (e.target.value) {
      case "notVacinated":
        filteredElements = temp.filter((item) => {
          return item.first_dose === false && item.second_dose === false;
        });
        break;
      case "firstDose":
        filteredElements = temp.filter((item) => {
          return item.first_dose === true && item.second_dose === false;
        });
        break;
      case "secondDose":
        filteredElements = temp.filter((item) => {
          return item.first_dose === true && item.second_dose === true;
        });
        break;
        case "positive":
          filteredElements = temp.filter((item) => {
            return (item.tests.length-1).test_result==='positive';
          });
          break;
          case "negative":
            filteredElements = temp.filter((item) => {
              return (item.tests.length-1).test_result==='negative';
            });
            break;
      case "clear":
        filteredElements = temp;
        break;
      default:
        return temp;
    }
    setUserData(filteredElements);
  };


  return (
    <div>
      <div className='tableheader'>
        <img
          className='icon'
          title='Add User'
          src={AddIcon}
          onClick={clickHandler}
          alt=''
        />
        {showModal ? (
          <Modal onClick={clickHandler} className='wrapper'>
            <Register setShowModal={setShowModal} />
          </Modal>
        ) : null}
      </div>
      <div id='demo'>
        <h1>User Details</h1>
        <div style={{padding:"10px 20px", background:"linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%)"}}>
          <label>Vaccine Status</label>
          <select onChange={handleFilter}style={{marginLeft:"10px"}}>
          <option disabled selected>
          --Select--
        </option>
          <option value="notVacinated">Not Vaccinated</option>
        <option value="firstDose">First dose</option>
        <option value="secondDose">Second dose</option>
        <option disabled>----------------------</option>
        <option value="positive">Positive</option>
        <option value="negative">Negative</option>
        <option disabled>----------------------</option>
        <option value="clear">Clear</option>
          </select>
        </div>
        <div className='table-responsive-vertical shadow-z-1'>
          <table id='table' className='table table-hover table-mc-light-blue'>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>EmiratesID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th> Vaccine Status</th>
                <th> Test Status</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className='tbl_body'>
            {/* {listData()} */}

            {userData.map((item,index) => (
      
      <tr>
        <td data-title='ID'>{index+1}</td>
        <td data-title='EmiratesId'>{item.emiratesID}</td>
        <td data-title='FirstName'>{item.first_name}</td>
        <td data-title='LastName'>{item.last_name}</td>
        <td data-title='VaccineStatus'>{item.first_dose===false&&item.second_dose===false?"Not vaccinated":item.first_dose===true&&item.second_dose===false?"first Dose":"Second Dose"}</td>
        <td data-title='TestStatus'>{item.tests.length===0?"NA":(item.tests.length-1).test_result}</td>
        <td data-title='Status'>
          <a href='#' target='_blank'>
            Invite
          </a>
        </td>
      </tr>
    ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Settings;
