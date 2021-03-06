import React, { useState, useEffect } from "react";
import EmpCard from "../UI/EmpCard/EmpCard";
import DetailsCard from "../UI/DetailsCard/DetailsCard";
import Modal from "../UI/Modal/Modal";
import "./Emplist.css";
import { ReactComponent as ReportIcon } from "../Icons/report.svg";
import deleteIcon from "../Icons/delete.svg";
import VaccineDetails from "../UI/VaccineDetails/VaccineDetails";
import TestDetails from "../UI/TestDetails/TestDetails";
import { useSelector, useDispatch } from "react-redux";
import getAxiosInstance from "../../axiosInstance";
import { addUserDetails } from "../../store/userDetails";
import { empAddUpdateAction } from "../../store/empAddUpdate";

export default function EmpList({ userArray, setUserArray }) {
  
  const dispatch = useDispatch();
  const empAddUpdateState = useSelector((state) => state.emp);
  const [selectedUser, setSelectedUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userVaccineData, setUserVaccineData] = useState([]);
  const [cardColor, setCardColor] = useState();
  useEffect(() => {
    getData();
  }, [empAddUpdateState]);

  const getData = async () => {
    getAxiosInstance().then(async (axiosInstance) => {
      await axiosInstance
        .get("userapi/accounts/")
        .then((res) => {
          setUserArray(res.data);
          console.log("emplist data", res.data);
          dispatch(
            addUserDetails({
              user_id: res.data[0].user_id,
              is_admin: res.data[0].is_admin,
              first_name: res.data[0].first_name,
              last_name: res.data[0].last_name,
              user_data: {
                email: res.data[0].email,
                emiratesID: res.data[0].emiratesID,
                avatar:res.data[0].avatar,
              },
            })
          );
        })
        .catch((err) => console.error(err));
    });
  };

  const clickHandler = (item) => {
    setSelectedUser(item);
    const positive = item.covid_status;
    setCardColor(positive);
    const tempShowModal = showModal;
    setShowModal(!tempShowModal);
  };

  const deleteEmpHandler = async (data) => {
    console.log(data.id);
    getAxiosInstance().then(async (axiosInstance) => {
      await axiosInstance
        .delete(`api/emprud/${data.id}`)
        .then(function (response) {
          console.log("delete response: ", response);
        })
        .catch((error) => {
          throw error;
        });
    });
  };

  return (
    <div>
      {userArray &&
        userArray.map((item) => (
          <EmpCard key={item.emiratesID} onClick={() => clickHandler(item)}>
            <div className='empcard__textwrapper'>
              <h3 className='emplist__name'>
                {" "}
                {item.first_name} {item.last_name}
              </h3>
              <h3 className='emplist__eid'>{item.emiratesID}</h3>
            </div>
            <div className='empcard__imagewrapper'>
              <ReportIcon className='reporticon' />
            </div>
          </EmpCard>
        ))}
      {showModal ? (
        <Modal onClick={clickHandler}>
          <div
            className='EmpDetailsWrap'
            style={{
              background: cardColor === "Positive" ? "rgb(255,0,0,0.6)" : null,
            }}>
            <img className={"imgCard"} src={selectedUser.Avatar} alt='' />
            <div>
              <h3 className='emplist__name emplist--white'>
                {selectedUser.first_name} {selectedUser.last_name}
              </h3>
              <h3 className='emplist__eid emplist--white'>
                {selectedUser.emiratesID}
              </h3>
            </div>
          </div>

          {/* Emp Vaccination Details */}
          <DetailsCard
            selectedUser={selectedUser}
            detailType='Vaccination Details'
            type='VaccinationDetails'
            userVaccineData={userVaccineData}
            // resetSelectedUser={resetSelectedUser}
          >
            <VaccineDetails
              selectedUser={selectedUser}
              userVaccineData={userVaccineData}
              setUserVaccineData={setUserVaccineData}
            />
          </DetailsCard>

          <DetailsCard
            detailType='COVID Test Details'
            type='TestDetails'
            selectedUser={selectedUser}>
            <div className='scrollable'>
              <TestDetails selectedUser={selectedUser} />
            </div>
          </DetailsCard>
        </Modal>
      ) : null}
    </div>
  );
}
