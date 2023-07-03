import React, { useEffect, useState } from "react";
import "./RightSidebar.css";
import { FaSearch } from "react-icons/fa";
import { EmployeCard } from "./EmployeCard";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../StateContext";
import axios from "axios";

const RightSidebar = () => {
  const [profileUser, setProfileUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, filteredarray, setfilteredarray } = useGlobalContext();

  useEffect(() => {
    setfilteredarray(user);
  }, [user, setfilteredarray]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query === "") {
      setfilteredarray(user);
    } else {
      const filteredUsers = user.filter((user) =>
        user.userName.includes(query)
      );
      setfilteredarray(filteredUsers);
    }
  };

  const handleMouseEnter = (element) => {
    setProfileUser(element);
    var profile = document.querySelector(".card-wrapper");
    profile.style.opacity = "1";
  };

  return (
    <>
      <div className={filteredarray ? "Right_sidebar" : "Right_sidebar_empty"}>
        <EmployeCard profileUser={profileUser} />

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            style={{
              borderRadius: "5px",
              padding: "8px",
              border: "1px solid #ccc",
              width: "80%",
              margin: "0.2rem",
            }}
            onChange={handleSearch}
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

        <div className="EmployeeNames">
          {filteredarray &&
            filteredarray.map((element) => (
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
