import "./Header.scss";
import React from 'react';
import SWlogo from '../../assets/images/star-wars-4.svg';

const Header = () => {
  return (
    <div
      className="container">
      <img
        src={SWlogo}
        alt="star-wars-logo" />
    </div>
  )
}

export default Header;