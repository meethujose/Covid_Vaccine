import React from "react";
import "./DetailsCard.css";
import Plus from "../../Icons/plus.svg";

export default function DetailsCard(props) {
  return (
    <div className='detail-card'>
      <div className='detail-card-header'>
        <h3 className='detail-card-header__title'>{props.detailType}</h3>
        <img className='detail-card-header__plus_icon' src={Plus} />
      </div>
      {props.children}
    </div>
  );
}
