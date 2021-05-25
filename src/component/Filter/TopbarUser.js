import React, { useState } from "react";
import "./TopbarUser.css";
import { useSpring, animated } from "react-spring";
import avatar from "../../assets/images/user1.png";
import BackDrop from './BackDrop'
export default function TopbarUser() {
  const [isHovered, setIsHovered] = useState(false);
  const styles = useSpring({
    width: isHovered ? 250 : 0,
    height: isHovered ? "auto" : 0,
    scale: isHovered ? 1 : 0,
    transform: "translate3d(0px,0,0) scale(1) rotateX(0deg)",
    backgroundColor: isHovered ? "white" : "green",
    borderRadius: 10,
  });

  const animation_on_button = () => {
    const temp = isHovered;
    setIsHovered(!temp);
  };
  return (
    <>
    { isHovered ? <BackDrop onClick = {animation_on_button} /> : null }
      <div className='profile__wrapper'>
        <div className='avatar__wrapper'>
          <img
            className='avatar'
            onClick={animation_on_button}
            src={avatar}
            alt=''
          />
        </div>
        <div className='dropdown__wrapper'>
          <animated.div className='animateddiv' style={styles}>
            <div className='dropdownhead'>
              {isHovered ? (
                <div className='name'>Muhammad Danish</div>
              ) : (
                <div className='name'>.</div>
              )}
              {isHovered ? (
                <div className='email'>Just4danish@gmail.com</div>
              ) : (
                <div className='name'>.</div>
              )}
            </div>
            <div className='dropdownbody'>
              {isHovered ? (
                <div className='dropdownbodytext'>
                  <ul className = 'dropdown__ul'>
                    <li className = 'dropdown__li'>Logout</li>
                    <li className = 'dropdown__li'>My Profile</li>
                    <li className = 'dropdown__li'>Change Password</li>
                    <li className = 'dropdown__li'>Add/Edit Vaccine Details</li>
                    <li className = 'dropdown__li'>Add/Edit Test Details</li>
                  </ul>
                </div>
              ) : (
                <div className='name'>.</div>
              )}
            </div>
          </animated.div>
        </div>
      </div>
    </>
  );
}
