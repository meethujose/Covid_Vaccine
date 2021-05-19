import React, { useState, useEffect } from "react";
import "./Settings.css";
import inviteIcon from "../Icons/invite.svg";
import Modal from "../../component/UI/Modal/Modal";
import AddIcon from "../Icons/AddUser.svg";
import Register from "../Register/Register";
import getAxiosInstance from "../../axiosInstance";
import DetailsCard from "../UI/DetailsCard/DetailsCard";
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
          console.log(res.data);
        })
        .catch((err) => console.error(err));
    });
  };

  const filterStatus = async (event)=>{

    let status = {filter:'status', key:event.target.value};

    listData(status);

  }

const listData = (filter = null)=>{
  
  // alert(JSON.stringify(filter));

  if(filter.key == 'all')
  {
    getData();
    return;
  }

  if(filter != null)
  {
    
    getAxiosInstance().then(async (axiosInstance) => {
      await axiosInstance
        .get("userapi/accounts/")
        .then((res) => {

          let tempData = [];

          res.data.map((item,index) => {
      
              if((filter.filter === 'status') && (filter.key === 'first_dose'))
              {
                if(item.first_dose === true)
                {
                  tempData.push(item);
                }
              }
      
              if((filter.filter === 'status') && (filter.key === 'not_vaccinated'))
              {
                if((item.first_dose === false) && item.second_dose === false)
                {
                  tempData.push(item);
                }
              }
      
              if((filter.filter === 'status') && (filter.key === 'second_dose'))
              {
               
                  if((item.first_dose === true) && (item.second_dose === true))
                  {
                    tempData.push(item);
                  }
                
              }              
          });
      
          setUserData(tempData);
        })
        .catch((err) => console.error(err));
    });

  }
  // else
  // {
  //   getData();
  // }

}


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
          <select onChange={filterStatus} style={{marginLeft:"10px"}}>
            <option value="all">SELECT</option>
            <option value="not_vaccinated">Not vaccinated</option>
            <option value="first_dose">First Dose</option>
            <option value="second_dose">Second Dose</option>
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
        <td data-title='VaccineStatus'>{item.first_dose===false&&item.second_dose===false?"Not vaccinated":item.first_dose===true?"first Dose":"Second Dose"}</td>
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
