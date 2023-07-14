import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOutCircle } from "react-icons/bi";
import "../../css/mainNav.css";
import { useGlobalContext } from "../../StateContext";
import axios from "axios";
import { ReactComponent as CDAC } from '../../Assets/CDAC_LOGO.svg';
import { BASE_URL } from '../Config.js';




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
  const getData = async () => {
    try {
      const empId = JSON.parse(localStorage.getItem("empId"));
      const { data } = await axios.post( BASE_URL + "getCurUser", {
        empId,
      });
      setcuruser(data);
      console.log(curuser);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <nav className="main-nav">
    <div className="nav-left">
      <i onClick={sidebarHandler} className="fa-solid fa-bars">
        <GiHamburgerMenu />
      </i>
      <div className="logo">
           <CDAC/>
      </div>
        <span>PRDS</span>
    </div>

    <div className="nav-right">
      <div className="user-profile-container">
        
        <button onClick={handleLogout} className="logout_btn">Logout  
        <BiLogOutCircle/>
        </button>

      
      </div>
    </div>
  </nav>
  );
};
