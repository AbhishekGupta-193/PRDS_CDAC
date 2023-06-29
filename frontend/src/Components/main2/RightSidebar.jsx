import React, { useState } from "react";
import "./RightSidebar.css";
import { FaSearch } from 'react-icons/fa';
import { EmployeCard } from './EmployeCard';


const RightSidebar = () => {
  const [profileUser,setProfileUser] = useState({
    userName:"",
    email:"",
    empId:"",
    designation : ""

  });
  const [users, setusers] = useState(
    JSON.parse(localStorage.getItem("allusers"))
  );


  const handleMouseEnter = (user) => {
    console.log(user);
    setProfileUser(user)
    var profile = document.querySelector('.card-wrapper');
    profile.style.opacity = '1'
  };
  
  const handleMouseLeave = () => {
    var profile = document.querySelector('.card-wrapper');
    profile.style.opacity = '0'
  };
    
  return (
    <div className="Right_sidebar">
       <EmployeCard profileUser={profileUser}/>

<div style={{ display: 'flex', alignItems: 'center', maxWidth: '300px' }}>
      <input
        type="text"
        placeholder="Search"
        style={{
          borderRadius: '5px',
          padding: '8px',
          border: '1px solid #ccc',
          width: '100%',
          margin : '0.2rem'
        }}
      />
      <FaSearch
        style={{
          marginLeft: '-30px',
          fontSize: '18px',
          color: '#888',
          cursor: 'pointer',
        }}
      />
    </div>
      
      <div className="EmployeeNames"  onMouseLeave={handleMouseLeave}>
        {users.map((user) => (
          <p  onMouseEnter={()=>handleMouseEnter(user)}
          className="emp-name"  key={user.id}>{user.userName}</p>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
