import React from "react";

import "antd/dist/antd.css";
import Header from "../../../component/UI/Header/Header";

import TestResultComponent from "../../../component/TestResultComponent/TestResultComponent";

export default function TestResult() {
  return (
    <div>
      <Header></Header>
      <div className='body'>
        <div className='table-style'>
          <TestResultComponent />
        </div>
      </div>
    </div>
  );
}
