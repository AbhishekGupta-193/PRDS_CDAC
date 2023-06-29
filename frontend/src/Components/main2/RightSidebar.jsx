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
  const {alluser, setalluser} = useGlobalContext();

  // const [users, setusers] = useState(
  //   JSON.parse(localStorage.getItem("allusers"))
  // );
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost5000/getUsers");
      // const data = await response.json();
      console.log(response);
      setalluser(response);
      console.log(alluser, " ye all user hai");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleMouseEnter = (user) => {
    setProfileUser(user);
    var profile = document.querySelector(".card-wrapper");
    profile.style.opacity = "1";
  };

  

  return (
    <>
      {alluser && (
        <div className="Right_sidebar">
          <EmployeCard profileUser={profileUser} />

          <div
            style={{ display: "flex", alignItems: "center", maxWidth: "300px" }}
          >
            <input
              type="text"
              placeholder="Search"
              style={{
                borderRadius: "5px",
                padding: "8px",
                border: "1px solid #ccc",
                width: "100%",
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
            {alluser.map((user) => (
              <p
                onClick={() => handleMouseEnter(user)}
                className="emp-name"
                key={user.id}
              >
                {user.userName}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RightSidebar;
