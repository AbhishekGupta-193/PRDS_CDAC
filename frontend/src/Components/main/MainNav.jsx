import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import UserProfile from "./UserProfile";
import {FaUserCircle} from 'react-icons/fa'
import "../../css/mainNav.css";
import { useGlobalContext } from "../../StateContext";


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
    localStorage.removeItem('curuser');
    navigate("/login");
    setcuruser(null);
  };

  return (
    <>
    <nav className="main-nav">
      <div className="nav-left">
        <i onClick={sidebarHandler} className="fa-solid fa-bars"></i>
        <div className="logo">
          <span>HRMS</span>
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
          <div className={`profile-details ${isUserProfileOpen?'profile-open':''}`}>
              <p>Name: John Doe</p>
              <p>Employee ID: 12345</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
      </div>
    </>
  );
};
