import React, { useState, useEffect } from "react";
import db, { storage } from "../../Data/FirebaseConfig";
import axios from "axios";
import EmpCard from "../UI/EmpCard/EmpCard";
import DetailsCard from "../UI/DetailsCard/DetailsCard";
import Moment from "moment";
import Modal from "../UI/Modal/Modal";
import "./Emplist.css";
import { Link } from "react-router-dom";
import Plus from "../Icons/plus.svg";
import report from "../Icons/report.svg";
import Register from "../Register/Register";
import moment from "moment";
import VaccineDetails from "../UI/VaccineDetails/VaccineDetails";
import TestDetails from "../UI/TestDetails/TestDetails";
export default function EmpList({ userArray, setUserArray, setMount, mount }) {
  const fileRef = React.useRef();
  const [selectedUser, setSelectedUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [userVaccineData, setUserVaccineData] = useState({});
  const [vaccineStatus, setVaccineStatus] = useState(<h3>Loading...</h3>);
  const [status, setStatus] = useState(true);
  const clickPlusHandler = () => {
    const tempVaccineShowModal = showVaccineModal;
    setShowVaccineModal(!tempVaccineShowModal);
  };

  useEffect(() => {
    console.log("selected userid", selectedUser.id);
    if (selectedUser.id) {
      axios
        .get(`http://lulu.transituae.net/api/vaccinelist/${selectedUser.id}`)
        .then((response) => {
          setUserVaccineData(response.data);

          const status = response.data.length;
          switch (status) {
            case 0:
              setVaccineStatus(
                <h3 className='emplist__name'>Not vaccinated</h3>
              );
              break;
            case 1:
              setVaccineStatus(
                <div>
                  <h5 className='EmpSetailsText'>First Dose</h5>

                  {response.data.length &&
                    response.data.map((data) => {
                      return (
                        <div>
                          {data.vaccine_dose === "Second" ? (
                            <h3>First Dose</h3>
                          ) : null}
                          {/* {JSON.stringify(data,4,4)} */}
                          {/* <p>Vaccination Dose:{data.vaccine_dose}</p>
                          <p>Vaccination Date:{data.vaccine_date}</p>
                          <p>Remarks:{data.remarks}</p> */}
                          {/* form */}

                          <div className='vaccine'>
                            <form className='addform' onSubmit={submitData}>
                              <div className='form_box'>
                                <label className='EmpSetailsText'>
                                  {selectedUser &&
                                  !Object.prototype.hasOwnProperty.call(
                                    selectedUser,
                                    "vaccine_dose"
                                  )
                                    ? "First"
                                    : "Second"}{" "}
                                  Dose:
                                </label>
                                <input
                                  type='date'
                                  placeholder='First Dose'
                                  name='First_Dose'
                                  required
                                  disabled
                                  value={data.vaccine_date}
                                  className='inputField'
                                  onChange={handleChange}
                                  max={moment().utc().format("YYYY-MM-DD")}
                                />
                              </div>
                              <div className='form_box'>
                                <label className='EmpSetailsText'>
                                  Remarks:
                                </label>
                                <input
                                  type='text'
                                  placeholder='Remarks'
                                  name='Remarks'
                                  disabled
                                  value={data.remarks}
                                  required
                                  className='inputField'
                                  onChange={handleChange}
                                />
                              </div>
                              <input
                                type='submit'
                                className=' regSubButton'
                                value='Add'
                              />
                            </form>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );

              break;
            case 2:
              setVaccineStatus(
                <div>
                  <h3>First Dose</h3>
                  {response.data.length &&
                    response.data.map((data) => {
                      return (
                        <div>
                          {/* {JSON.stringify(data,4,4)} */}

                          <p>Vaccination Dose:{data.vaccine_dose}</p>
                          <p>Vaccination Date:{data.vaccine_date}</p>
                          <p>Remarks:{data.remarks}</p>
                        </div>
                      );
                    })}
                  {setStatus(false)}
                </div>
              );

              break;
            default:
              setVaccineStatus(<h3>Data Not available</h3>);
          }

          console.log(response.data.length);
        })
        .catch((error) => {
          console.log("failed to fetch data", error);
        });
    }
    return () => {};
  }, [selectedUser.id]);
  console.log("vaccination data:", userVaccineData);
  useEffect(() => {
    axios
      .get("http://lulu.transituae.net/api/emplist/")
      .then((response) => {
        setUserArray(response.data);
        setMount(false);
      })
      .catch((err) => console.error(err));
  }, []);
  const clickHandler = (item) => {
    setSelectedUser(item);
    console.log("selected item", item);
    const tempShowModal = showModal;
    setShowModal(!tempShowModal);
  };

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  // submit data
  const submitData = async (e) => {
    e.preventDefault();
    //image upload

    console.log("clicked");
    var file = fileRef.current.files[0];
    var storageRef = storage.ref().child(`Attachments/${file.name}`).put(file);

    storageRef.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then(async (url) => {
          console.log(url);
          const res = await axios
            .post("http://lulu.transituae.net/api/vaccinecreate/", {
              vaccine_dose: "first",
              vaccine_date: formData.First_Dose,
              remarks: formData.Remarks,
              attachments: url,
              name: selectedUser.id,
            })
            .then(function (response) {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });

          formData.username = "";
          formData.PhoneNumber = "";
          formData.EmiratesId = "";
          setShowModal(false);
        });
      }
    );
    //
  };
  //

  return (
    <div>
      {userArray.map((item) => (
        <EmpCard key={item.emiratesID} onClick={() => clickHandler(item)}>
          <div className='empcard__textwrapper'>
            <h3 className='emplist__name'> {item.name}</h3>
            <h3 className='emplist__eid'>{item.emiratesID}</h3>
          </div>
          <div className='empcard__imagewrapper'>
            <img className='reporticon' src={report} />
          </div>
        </EmpCard>
      ))}
      {showModal ? (
        <Modal onClick={clickHandler}>
          <div className='EmpDetailsWrap'>
            <img className={"imgCard"} src={selectedUser.Avatar} alt='' />
            <div>
              <h3 className='emplist__name emplist--white'>
                {selectedUser.name}
              </h3>
              <h3 className='emplist__eid emplist--white'>
                {selectedUser.emiratesID}
              </h3>
            </div>
          </div>
          {/* Emp Vaccination Details */}
          <DetailsCard detailType = "Vaccination Details">
            <VaccineDetails/>
            <VaccineDetails/>
          </DetailsCard>
          <DetailsCard detailType = "COVID Test Details">
            <div className = 'scrollable'>
            <TestDetails/>
            <TestDetails/>
            <TestDetails/>
            <TestDetails/>
            <TestDetails/>
            <TestDetails/>
            <TestDetails/>
            <TestDetails/>
            </div>
          </DetailsCard>
        </Modal>
      ) : null}
    </div>
  );
}
