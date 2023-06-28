
import React, { useState } from 'react';
import './RightSidebar.css';

const RightSidebar = () => {
  const [users,setusers] = useState(JSON.parse(localStorage.getItem("allusers")))
  return (
    <div className="Right_sidebar">
      <div className="search">
        <input type="text" placeholder="Search" />
        <button>Search</button>
        <div className='EmployeeNames'>
      {users.map((user) => (
        <p  key={user.id}>{user.userName}</p>
      ))}
    </div>
      </div>
      {/* Sidebar content goes here */}
    </div>
  );
};

export default RightSidebar;
