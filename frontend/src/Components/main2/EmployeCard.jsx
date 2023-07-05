import React, { useEffect, useState } from "react";
import "./EmployeeCard.css";
import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export const EmployeCard = ({ profileUser }) => {
  console.log(profileUser, "profuile user");
  const [CurrentUser,setCurrentUser] = useState(profileUser);
  useEffect(()=>{
    setCurrentUser(profileUser);
  },[profileUser])
  const navigate = useNavigate();

  const handleExit = () => {
    var profile = document.querySelector(".card-wrapper");
    profile.style.opacity = "0";
  };
  const fillForrm = (profileUser) => {
    navigate("/form/APAR",{ state: profileUser });
  };
  return (
    <div
      className="card-wrapper"
      
    >
      <div className="img-area">
        <div className="inner-area">
          <img
            src="http://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
      </div>
      <div className="icon arrow">
        <i className="fas fa-arrow-left"></i>
      </div>
      <div className="icon dots">
        <i className="fas fa-ellipsis-v" onClick={handleExit}>
          <GrFormClose/>
        </i>
      </div>
      <div className="name">{CurrentUser?.userName}</div>
      <div className="about">
        {CurrentUser?.quarter[CurrentUser?.quarter?.length - 1]?.designation}
        </div>
      <div className="social-icons">
        <a href="#" className="Git">
          <i className="Github">
            <BsGithub />
          </i>
        </a>
        <a href="#" className="linked">
          <i className="fab fa-twitter">
            <FaLinkedinIn />
          </i>
        </a>
       
      </div>
      <div className="buttons">
        <button>Message</button>
        <button onClick={()=>fillForrm(profileUser)} >APAR</button>
      </div>
      <div className="social-share">
        <div className="row">
          <i className="far fa-heart"></i>
          <i className="icon-2 fas fa-heart"></i>
          <span>Avg Score</span>
        </div>
        <div className="row">
          <i className="far fa-comment"></i>
          <i className="icon-2 fas fa-comment"></i>
          <span>Remark</span>
        </div>
        <div className="row">
          <i className="fas fa-share"></i>
        </div>
      </div>
    </div>
  );
};
