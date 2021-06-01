import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { isAuth } from "../../store/isAuthenticated";
import getAxiosInstance from "../../axiosInstance";

import { empAddUpdateAction } from "../../store/empAddUpdate";
import { Skeleton, Switch, Card, Avatar } from "antd";
import { Modal, Button, DatePicker, Space } from "antd";
import fileDownloadIcon from "../../component/Icons/file.svg";
import ModalUi from "../UI/Modal/Modal";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import vaccineIcon from "../../component/Icons/syringe.svg";
import "./EditVaccine.css";

export default function EditVaccine(props) {
  const { Meta } = Card;
  const dispatch = useDispatch();
  const labelRef = React.useRef();
  const [formData, setFormData] = useState({});
  const [userVaccinationData, setUserVaccinationData] = useState([]);

  const [editVaccineModal, setEditVaccineModal] = useState(false);
  const [editableFirstCard, setEditableFirstCard] = useState(false);
  const [editableSecondCard, setEditableSecondCard] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getAxiosInstance().then(async (axiosInstance) => {
      await axiosInstance
        .get("userapi/selfvaccine/")
        .then(function (response) {
          console.log(response.data);
          setUserVaccinationData(response.data);

          setEditVaccineModal(!editVaccineModal);
        })
        .catch((err) => {
          console.log("vaccine update failed", err);
        });
    });
  }, []);
  // form data handling

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  // show editable Card
  const EditableFirstCardHandler = () => {
    setEditableFirstCard(!editableFirstCard);
  };
  const EditableSecondCardHandler = () => {
    setEditableSecondCard(!editableSecondCard);
  };
  // to show vaccine modal

  const DetailsCardHandler = () => {
    setEditVaccineModal(!editVaccineModal);
  };

  const handleOk = () => {
    props.setEditVaccineModal(false);
  };

  const handleCancel = () => {
    props.setEditVaccineModal(false);
    // setEditProfile(false);
  };

  // submit vaccine data
  const submitSecondData = async (e) => {
    e.preventDefault();
    console.log("testing", userVaccinationData);
    const dose = userVaccinationData.first_dose
      ? "second_dose"
      : userVaccinationData.second_dose
      ? "second_dose"
      : "first_dose";
    if (userVaccinationData) {
      getAxiosInstance().then(async (axiosInstance) => {
        await axiosInstance
          .put("userapi/selfvaccine/", {
            second_dose:true,
            second_dose_date: formData.Dose_Date
              ? formData.Dose_Date
              : userVaccinationData.second_dose_date,
              second_dose_details:formData.myfile
              ? formData.myfile
              : userVaccinationData.myfile,
          })
          .then(function (response) {
            console.log(response.data);
            dispatch(empAddUpdateAction.added());
            setUserVaccinationData(response.data);
            console.log(response);
            formData.Dose_Date = "";
            formData.Remarks = "";

            setEditVaccineModal(!editVaccineModal);
          })
          .catch((err) => {
            console.log("vaccine update failed", err);
          });
      });
    }
  };
  const submitFirstData = async (e) => {
    e.preventDefault();
    console.log("testing", userVaccinationData);

    if (userVaccinationData) {
      getAxiosInstance().then(async (axiosInstance) => {
        await axiosInstance
          .put("userapi/selfvaccine/", {
            first_dose:true,
            first_dose_date: formData.Dose_Date
              ? formData.Dose_Date
              : userVaccinationData.first_dose_date,
              first_dose_details:formData.myfile
              ? formData.myfile
              : userVaccinationData.myfile,
            
          })
          .then(function (response) {
            console.log(response.data);
            dispatch(empAddUpdateAction.added());

            console.log(response);
            formData.Dose_Date = "";
            formData.Remarks = "";
            setUserVaccinationData(response.data);
            setEditVaccineModal(!editVaccineModal);
          })
          .catch((err) => {
            console.log("vaccine update failed", err);
          });
      });
    }
  };

  function onChange(date, dateString) {
    console.log("date", dateString);
  }
  return (
    <div className='vaccine-card-wrapper'>
      <Modal
        title='Vaccine Details'
        visible={props.modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          // <Button key='back'>Return</Button>,
          <Button
            key='back'
            onClick={() =>
              props.setEditVaccineModal(props.editVaccineModal ? false : true)
            }>
            close
          </Button>,
        ]}>
        <div className='vaccineeditmodal'>
          <Card
            style={{
              width: 400,
              marginTop: 26,
              marginLeft: 26,
              marginRight: 26,
            }}
            actions={[
              <div>
                {editableFirstCard ? (
                  <Button key='back' onClick={EditableFirstCardHandler}>
                    back
                  </Button>
                ) : (
                  <EditOutlined key='edit' onClick={EditableFirstCardHandler} />
                )}
              </div>,
            ]}>
            <Meta
              avatar={<Avatar src={vaccineIcon} />}
              title='First Dose'
              description={[
                <div>
                  <p></p>

                  {editableFirstCard ? (
                    <form className='addform' onSubmit={submitFirstData}>
                      <div className='form_box'>
                        <label className='EmpSetailsText' ref={labelRef}>
                          Vaccine Dose
                        </label>

                        <input
                          type='date'
                          placeholder='Dose date'
                          name='Dose_Date'
                          required
                          className='DetailsinputField'
                          onChange={handleChange}
                          defaultValue={userVaccinationData.first_dose_date}
                          // min={userVaccinationData.first_dose_date}
                        />
                      </div>

                      <div className='form_box'>
                        <label className='EmpSetailsText'>Attachment:</label>
                        <input
                          type='file'
                          id='myfile'
                          name='myfile'
                          onChange={handleChange}></input>
                      </div>
                      <input
                        type='submit'
                        className='AddButton'
                        value={userVaccinationData.first_dose ? "Edit" : "Add"}
                      />
                    </form>
                  ) : (
                    <div>
                      <p>
                        {userVaccinationData.first_dose ? (
                          <div>
                            <p>
                              Vaccine Date :
                              {userVaccinationData.first_dose_date}
                            </p>
                            <div className='file-Remarks'>
                              <p>Remarks:</p>
                              <a
                                href={
                                  userVaccinationData.first_dose_details
                                    ? userVaccinationData.first_dose_details
                                    : null
                                }
                                download>
                                {" "}
                                <img
                                  className='file-download-icon'
                                  src={fileDownloadIcon}
                                  alt=''
                                />
                              </a>
                            </div>
                          </div>
                        ) : (
                          "Second Dose Not Added"
                        )}
                      </p>
                    </div>
                  )}
                </div>,
              ]}
            />
          </Card>

          {/* <Card
            style={{
              width: 400,
              marginTop: 26,
              marginLeft: 26,
              marginRight: 26,
            }}
            actions={[
              <div>
                {editableFirstCard ? (
                  <Button key='back' onClick={EditableFirstCardHandler}>
                    back
                  </Button>
                ) : (
                  <EditOutlined key='edit' onClick={EditableFirstCardHandler} />
                )}
              </div>,
            ]}>
            <Meta
              avatar={<Avatar src={vaccineIcon} />}
              title='First Dose'
              description={[
                <div>
                  {editableFirstCard ? (
                    <form className='addform' onSubmit={submitData}>
                      <div className='form_box'>
                        <label className='EmpSetailsText' ref={labelRef}>
                          First Dose
                        </label>
                        {console.log('vaccine data ',userVaccinationData)}
                      
                          //  <DatePicker onChange={onChange} />
                          <input
                            type='date'
                            placeholder='Dose date'
                            name='Dose_Date'
                            defaultValue={userVaccinationData.first_dose_date}
                            required
                            className='DetailsinputField'
                            onChange={handleChange}
                            // min={userVaccinationData.first_dose_date}
                          />
                       
                      </div>
                      <div className='form_box'>
                        <label className='EmpSetailsText'>Attachment:</label>
                        <input
                          type='file'
                          id='myfile'
                          name='myfile'
                          defaultValue={userVaccinationData.first_dose_details}
                          onChange={handleChange}
                        />
                      </div>
                      <input type='submit' className='AddButton' value='Add' />
                    </form>
                  ) : (
                    <div>
                      {userVaccinationData.first_dose ? (
                        <div>
                          <p>
                            Vaccine Date :
                            {userVaccinationData &&
                            userVaccinationData.first_dose_date
                              ? userVaccinationData.first_dose_date
                              : null}
                          </p>
                          <div className='file-Remarks'>
                            <p>Remarks:</p>
                            <a
                              href={
                                userVaccinationData &&
                                userVaccinationData.first_dose_details
                                  ? userVaccinationData.first_dose_details
                                  : null
                              }
                              download>
                              {" "}
                              <img
                                className='file-download-icon'
                                src={fileDownloadIcon}
                              />
                            </a>
                          </div>
                        </div>
                      ) : (
                        "First Dose Not Added"
                      )}
                    </div>
                  )}
                </div>,
              ]}
            />
          </Card> */}

          <Card
            style={{
              width: 400,
              marginTop: 26,
              marginLeft: 26,
              marginRight: 26,
            }}
            actions={[
              <div>
                {editableSecondCard ? (
                  <Button key='back' onClick={EditableSecondCardHandler}>
                    back
                  </Button>
                ) : (
                  <EditOutlined
                    key='edit'
                    onClick={EditableSecondCardHandler}
                  />
                )}
              </div>,
            ]}>
            <Meta
              avatar={<Avatar src={vaccineIcon} />}
              title='Second Dose'
              description={[
                <div>
                  <p></p>

                  {editableSecondCard ? (
                    <form className='addform' onSubmit={submitSecondData}>
                      <div className='form_box'>
                        <label className='EmpSetailsText' ref={labelRef}>
                          Vaccine Dose
                        </label>

                        <input
                          type='date'
                          placeholder='Dose date'
                          name='Dose_Date'
                          required
                          className='DetailsinputField'
                          onChange={handleChange}
                          defaultValue={userVaccinationData.second_dose_date}
                          min={userVaccinationData.first_dose_date}
                        />
                      </div>

                      <div className='form_box'>
                        <label className='EmpSetailsText'>Attachment:</label>
                        <input
                          type='file'
                          id='myfile'
                          name='myfile'
                          onChange={handleChange}></input>
                      </div>
                      <input
                        type='submit'
                        className='AddButton'
                        value={userVaccinationData.second_dose ? "Edit" : "Add"}
                      />
                    </form>
                  ) : (
                    <div>
                      <p>
                        {userVaccinationData.second_dose ? (
                          <div>
                            <p>
                              Vaccine Date :
                              {userVaccinationData.second_dose_date}
                            </p>
                            <div className='file-Remarks'>
                              <p>Remarks:</p>
                              <a
                                href={
                                  userVaccinationData.second_dose_details
                                    ? userVaccinationData.second_dose_details
                                    : null
                                }
                                download>
                                {" "}
                                <img
                                  className='file-download-icon'
                                  src={fileDownloadIcon}
                                />
                              </a>
                            </div>
                          </div>
                        ) : (
                          "Second Dose Not Added"
                        )}
                      </p>
                    </div>
                  )}
                </div>,
              ]}
            />
          </Card>
        </div>
      </Modal>
    </div>
  );
}
