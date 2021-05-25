import React, { useState } from "react";
import Header from "../../component/UI/Header/Header";
import AdminDropBox from "../../component/AdminDropBox/AdminDropBox";
import Search from "../../component/UI/Search/Search";
import EmpList from "../../component/EmpList/EmpList";

export default function Home() {
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
