import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../assets/images/rob.png';
import IntlMessages from '../../../component/utility/intlMessages';
import FourZeroFourStyleWrapper from './ExpiredLink.styles';

export default function Error404() {
  return (
    <FourZeroFourStyleWrapper className="iso404Page">
      <div className="iso404Content">
        <h1>
          <IntlMessages id="expired404.title" />
        </h1>
        <h3>
          <IntlMessages id="expired404.subTitle" />
        </h3>
        <p>
          <IntlMessages id="expired404.description" />
        </p>
          <button onClick = {()=>{window.close()}} type="button">
            <IntlMessages id="expired404.backButton" />
          </button>
      </div>

      <div className="iso404Artwork">
        <img alt="#" src={Image} />
      </div>
    </FourZeroFourStyleWrapper>
  );
}