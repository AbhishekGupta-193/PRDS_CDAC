import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import "../../css/mainNav.css";
import { useGlobalContext } from "../../StateContext";
import axios from "axios";


export const MainNav2 = () => {
  const navigate = useNavigate();
  const { curuser, setcuruser } = useGlobalContext();

  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const sidebarHandler = () => {
    document.getElementsByClassName("side-bar")[0].classList.toggle("open");
  };

  const toggleUserProfile = () => {
    setIsUserProfileOpen(!isUserProfileOpen);
  };
  const getData = async () => {
    try {
      const empId = JSON.parse(localStorage.getItem("empId"));
      const { data } = await axios.post("http://localhost:5000/getCurUser", {
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

  const handleLogout = () => {
    localStorage.removeItem("empId");
    navigate("/login");
  };

  return (
    <nav className="main-nav">
      <div className="nav-left">
        <i onClick={sidebarHandler} className="fa-solid fa-bars">
          <GiHamburgerMenu />
        </i>
        <div className="logo">
          <span>PRIS</span>
        </div>
      </div>

      <div className="nav-right">
        <div className="user-profile-container">
          
          {/* <span>Hi {curuser && curuser.userName}</span> */}
          <button onClick={handleLogout} className="logout_btn">Logout</button>
        
        </div>
      </div>
    </nav>
  );
};
