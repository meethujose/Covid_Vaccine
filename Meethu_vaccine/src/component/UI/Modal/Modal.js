import React, { useEffect } from "react";
import BackDrop from "./BackDrop";
// import "./Modal.css";
import "./Modal-new.css";
export default function Modal(props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  return (
    <>
      <BackDrop onClick={props.onClick} />

      <div className='modal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <span className='close' onClick={props.onClick}>
              &times;
            </span>
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}
