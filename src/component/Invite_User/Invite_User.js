import React,{useState} from 'react'
import './Invite_User.css';
import getAxiosInstance from "../../axiosInstance";
export default function Invite_User() {
    const [formData, setFormData] = useState({});
    const [userType, setuserType] = useState();
    const handleChange = (e) => {
        setFormData((formData) => ({
          ...formData,
          [e.target.name]: e.target.value,
        }));
      };
    
  const submitUserData = async (e) => {
    e.preventDefault();

          getAxiosInstance().then(async axiosInstance=>{
            await  axiosInstance
            .post("api/inviteuser/", {
             first_name: formData.Firstname,
             last_name: formData.Lastname,
             email:formData.Email,
             userType:userType  
           })
           .then(function (response) {
         
           });
         });
  };
    return (
        <div className='inviteUserForm'>
            <form className='addform'onSubmit={submitUserData} >
              <div className='form_box'>
                <label>First Name</label>
                <input
                  type='text'
                  placeholder='First Name'
                  name='Firstname'
                  required
                  className='inviteUserinputField'
                  onChange={handleChange}
                />
              </div>
          
              <div className='form_box'>
                <label>Last Name</label>
                <input
                  type='text'
                  placeholder='Last Name'
                  name='Lastname'
                  required
                  className='inviteUserinputField'
                  onChange={handleChange}
                />
              </div>
              <div className='form_box'>
                <label>Email</label>
                <input
                  type='text'
                  placeholder='Email'
                  name='Email'
                  required
                  className='inviteUserinputField'
                  onChange={handleChange}
                />
              </div>
              <div className='form_box'>
                <label >Result:</label>
                <select
                  id='Result'
                  name='Result'
                  value={userType}
                  className='inviteUserinputField'
                  required
                  onChange={(e) => setuserType(e.target.value)}>
                  <option value='user'   className='EditTestinputField '>
                  User
                  </option>
                  <option value='admin'   className='EditTestinputField '>
                  Admin
                  </option>
                </select>
              </div>
              <input type='submit' className=' inviteUser' value='Submit' />
            </form>
          
        </div>
      );
    }
    
