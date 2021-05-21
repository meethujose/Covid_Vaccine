import React from "react";
import "./EmpCard.css";
export default function EmpCard(props) {
  return (
    <div className='empcard' onClick={props.onClick}>
    {props.children}
      
    </div>
  );
}
