import React from "react";
import BackDrop from "./BackDrop";
import "./Modal.css";
export default function Modal(props) {
  return (
    <>
      <BackDrop onClick={props.onClick} />

      <div className='Modal'>
        <span className='close' onClick={props.onClick}>
          &times;
        </span>
        {props.children}
      </div>
    </>
  );
}
