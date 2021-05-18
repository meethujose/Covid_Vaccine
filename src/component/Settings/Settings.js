import React, { useState, useEffect } from "react";
import "./Settings.css";
import inviteIcon from "../Icons/invite.svg";
import Modal from "../../component/UI/Modal/Modal";
import AddIcon from "../Icons/AddUser.svg";
import Register from "../Register/Register";
import getAxiosInstance from "../../axiosInstance";
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
        })
        .catch((err) => console.error(err));
    });
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
              {userData &&
                userData.map((item) => (
                  <tr>
                    <td data-title='ID'>1</td>
                    <td data-title='EmiratesId'>{item.emiratesID}</td>
                    <td data-title='FirstName'>{item.first_name}</td>
                    <td data-title='LastName'>{item.last_name}</td>
                    <td data-title='VaccineStatus'>{item.first_dose===false&&item.second_dose===false?"Not vaccinated":item.first_dose===true?"first Dose":"Second Dose"}</td>
                    <td data-title='TestStatus'>{item.tests.length===0?"NA":item.tests[0].test_result}</td>
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
