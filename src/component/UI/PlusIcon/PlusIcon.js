import React, { useState, useEffect } from "react";
import PlusFilterIcon from "../../Icons/filter.svg";
import { useSpring, animated } from "react-spring";
import BackDrop from "../../Filter/BackDrop";
import "./PlusIcon.css";
import "antd/dist/antd.css";
import { Switch } from "antd";
import { useSelector } from "react-redux";
function PlusIcon({ userArray, setUserArray }) {
  const userList = useSelector((state) => state.userData);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isHovered, setIsHovered] = useState(false);
  const [isMyCard, setIsMyCard] = useState(false);
  const [isFirstDose, setIsFirstDose] = useState(false);
  const [isSecondDose, setIsSecondDose] = useState(false);
  const [isPositive, setIsPositive] = useState(false);
  const [isNegative, setIsNegative] = useState(false);
  const styles = useSpring({
    width: isHovered ? 250 : 0,
    height: isHovered ? "auto" : 0,
    scale: isHovered ? 1 : 0,
    transform: "translate3d(0px,200px,0px) scale(1) rotateX(0deg)",
    backgroundColor: isHovered ? "white" : "green",
    borderRadius: 10,
  });

  const animation_on_plusIcon = () => {
    const temp = isHovered;
    setIsHovered(!temp);
  };

  const handleMyCardChange = () => {
    setIsMyCard(!isMyCard);
  };

  const handleFirstDoseChange= () => {
    setIsFirstDose(!isFirstDose);
  };

  const handleSecondDoseChange= () => {
    setIsSecondDose(!isSecondDose);
  };

  const handleTestPositive= () => {
    setIsPositive(!isPositive);
  };

  const handleTestNegative= () => {
    setIsNegative(!isNegative);
  };

  useEffect(() => {
      
    isMyCard
      ? setUserArray(
          userArray.filter((_user) => _user.email === userData.email)
        )
      : setUserArray(userList);

  }, [isMyCard]);

  useEffect(() => {
    isFirstDose
      ? setUserArray(
          userArray.filter((_user) => _user.first_dose)
        )
      : setUserArray(userList);   
  }, [isFirstDose]);

  useEffect(() => {
    isSecondDose
      ? setUserArray(
          userArray.filter((_user) => _user.second_dose)
        )
      : setUserArray(userList);   
  }, [isSecondDose]);

  useEffect(() => {
    isPositive
      ? setUserArray(
          userArray.filter((_user) => _user.covid_status==='Positive')
        )
      : setUserArray(userList);   
  }, [isPositive]);

  useEffect(() => {
    isNegative
      ? setUserArray(
          userArray.filter((_user) => _user.covid_status==='Negative')
        )
      : setUserArray(userList);   
  }, [isNegative]);
  return (
    // <div>
    //   <img className='filtericon'   onClick={animation_on_plusIcon} src={PlusFilterIcon} alt='' />
    // </div>
 <>
      {isHovered ? <BackDrop onClick={animation_on_plusIcon} /> : null}
     <div className='fab_btn_container'>
         <div>
          <img
            className='filtericon'
            onClick={animation_on_plusIcon}
            src={PlusFilterIcon}
            alt=''
          />
        </div>
        <div className='dropdown__wrapper'>
          <animated.div className='animateddiv' style={styles}>
            <div className='dropdownhead'></div>
            <div className='dropdownbody'>
              {isHovered ? (
                <div className='dropdownbodytext'>
                  <ul className='dropdown__ul'>
                    <li className='dropdown__li'>
                      My Card Only{" "}
                      <label className='switch'>
                        <input
                          type='checkbox'
                          checked={isMyCard}
                          onChange={handleMyCardChange}
                        />
                        <span className='slider round'></span>
                      </label>
                    </li>
                    <li className='dropdown__li'>
                      Vaccinated
                      <ul>
                        <li className='dropdown__li'>First Dose     <label className='switch'>
                        <input
                          type='checkbox'
                          checked={isFirstDose}
                          onChange={handleFirstDoseChange}
                        />
                        <span className='slider round'></span>
                      </label></li>
                        <li className='dropdown__li'>Second Dose      <label className='switch'>
                        <input
                          type='checkbox'
                          checked={isSecondDose}
                          onChange={handleSecondDoseChange}
                        />
                        <span className='slider round'></span>
                      </label></li>
                      </ul>
                    </li>
                    <li className='dropdown__li'>
                      Test Result
                      <ul>
                        <li className='dropdown__li'>Positive     <label className='switch'>
                        <input
                          type='checkbox'
                          checked={isPositive}
                          onChange={handleTestPositive}
                        />
                        <span className='slider round'></span>
                      </label></li>
                        <li className='dropdown__li'>Negative    <label className='switch'>
                        <input
                          type='checkbox'
                          checked={isNegative}
                          onChange={handleTestNegative}
                        />
                        <span className='slider round'></span>
                      </label></li>
                      </ul>
                    </li>
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

export default PlusIcon;
