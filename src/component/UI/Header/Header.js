import React from "react";
import Search from "../Search/Search";

import "./Header.css";

export default function Header(props) {
  return (
    <div className='header'>
      
      {props.children}
    </div>
  );
}
