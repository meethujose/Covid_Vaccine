import React, { useState } from "react";
import Header from "../UI/Header/Header";
import AdminDropBox from "../AdminDropBox/AdminDropBox";
import Search from "../UI/Search/Search";
import EmpList from "../EmpList/EmpList";

export default function Admin() {
  const [userArray, setUserArray] = useState([]);
  return (
    <div>  
      <Header>
        <Search userArray={userArray} setUserArray={setUserArray} />
        <AdminDropBox userArray={userArray} setUserArray={setUserArray} />
      </Header>
      <div className='body'>
        <EmpList userArray={userArray} setUserArray={setUserArray} />
      </div>
    </div>
  );
}
