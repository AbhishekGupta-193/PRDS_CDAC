import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaUserCircle} from 'react-icons/fa'
import "../../css/mainNav.css";
import { useGlobalContext } from "../../StateContext";
import {GiHamburgerMenu} from 'react-icons/gi'



export const MainNav = () => {
  const navigate = useNavigate();
  const {curuser,setcuruser} = useGlobalContext();
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const sidebarHandler = () => {
    document.getElementsByClassName("side-bar")[0].classList.toggle("open");
  };

  const toggleUserProfile = () => {
    setIsUserProfileOpen(!isUserProfileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('empId');
    navigate("/login");
  };

  return (
    <>
    <nav className="main-nav">
      <div className="nav-left">
        <i onClick={sidebarHandler} className="fa-solid fa-bars">
        <GiHamburgerMenu/>
          
        </i>
        <div className="logo">
          <span>PRIS</span>
        </div>
      </div>
    </nav>
      <div className="nav-right">
        <div className="user-profile-container">
          <div
            className='profile-avatar'
            onClick={toggleUserProfile}
          >
            <FaUserCircle/>
          </div>
              <button onClick={handleLogout} className="logout_btn">Logout</button>
          {/* <div className={`profile-details ${isUserProfileOpen?'profile-open':''}`}>
              <p>Name: John Doe</p>
              <p>Employee ID: 12345</p>
            </div> */}
        </div>
      </div>
    </>
  );
};
