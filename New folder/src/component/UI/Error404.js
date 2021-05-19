import React from "react";
import "../SignIn/SignIn.css";

export default function Error404() {
  return (
    <div className="wrapper">
      <div className="container">
        <div
          style={{
            width: "100%",
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>404 Page Not Found</h1>
        </div>
      </div>
      <ul className="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
