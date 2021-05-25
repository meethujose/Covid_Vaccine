import React from "react";
import "./Header.css";

export default function Header(props) {
  return (
    <div className='header headerwrapper' style={{ marginTop: '-12rem'}}>
      {props.children}
    </div>
  );
}
