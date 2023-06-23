import React, { useState } from "react";
import "./Landing_nav.css";

const Landing_nav = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <nav className="Landing_nav">
      <div className="Landing_nav__logo">
        <img src="logo.png" alt="Logo" />
        <span className="Landing_nav__logo-text">
          Centre for Development of Advanced Computing
        </span>
      </div>
      <div className="Landing_nav__links">
        <a href="#" className="Landing_nav__link">About Us</a>
        <button className="Landing_nav__login-btn" onClick={handleLoginClick}>
          Login
        </button>
        {isLoginOpen && (
          <div className="Landing_nav__login-box">
            <button className="Landing_nav__login-option">Login as HR</button>
            <button className="Landing_nav__login-option">Login as Employee</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Landing_nav;
