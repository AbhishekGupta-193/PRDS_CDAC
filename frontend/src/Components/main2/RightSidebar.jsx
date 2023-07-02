import React, { useEffect, useState } from "react";
import "./RightSidebar.css";
import { FaSearch } from "react-icons/fa";
import { EmployeCard } from "./EmployeCard";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../StateContext";
import axios from "axios";


const RightSidebar = () => {
  const [profileUser, setProfileUser] = useState({});
  const navigate = useNavigate();
  const {user , TotalEmployee , APAR_issued , APAR_not_initiated , APAR_completed , Self_Appraisal_filled} = useGlobalContext();

 


  const handleMouseEnter = (element) => {
    setProfileUser(element);
    var profile = document.querySelector(".card-wrapper");
    profile.style.opacity = "1";
  };

  

  return (
    <>
       <div className={user? "Right_sidebar" : "Right_sidebar_empty"}>
          <EmployeCard profileUser={profileUser} />

          <div
            style={{ display: "flex", alignItems: "center"}}
          >
            <input
              type="text"
              placeholder="Search"
              style={{
                borderRadius: "5px",
                padding: "8px",
                border: "1px solid #ccc",
                width: "80%",
                margin: "0.2rem",
              }}
            />
            <FaSearch
              style={{
                marginLeft: "-30px",
                fontSize: "18px",
                color: "#888",
                cursor: "pointer",
              }}
            />
          </div>

          <div className="EmployeeNames"
          //  onMouseLeave={handleMouseLeave}
           >
            {user && user.map((element) => (
              <p
                onClick={() => handleMouseEnter(element)}
                className="emp-name"
                key={element.id}
              >
                {element.userName}
              </p>
            ))}
          </div>
        </div>
    
    </>
  );
};

export default RightSidebar;
