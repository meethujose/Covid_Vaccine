import React, { useEffect } from "react";
import BackDrop from "./BackDrop";
import "./Modal.css";
export default function Modal(props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  return (
    <>
      <BackDrop onClick={props.onClick} />

      <div className='Modal Modal-body'>
        <span className='close' onClick={props.onClick}>
          &times;
        </span>
        {props.children}
      </div>
    </>
  );
}
