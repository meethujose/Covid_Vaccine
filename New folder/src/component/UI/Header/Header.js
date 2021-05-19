import React from "react";


import "./Header.css";

export default function Header(props) {
  return (
    <div className='header headerwrapper'>
      
      {props.children}
    </div>
  );
}
