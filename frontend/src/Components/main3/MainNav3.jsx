import { React } from "react";
import "../../css/mainNav.css";
import { Link, useNavigate } from 'react-router-dom';


export const MainNav3 = () => {
  const navigate = useNavigate();

  const sidebarHandler = () => {
    document.getElementsByClassName("side-bar")[0].classList.toggle("open");
  };

  return (
    <nav className="main-nav">
      <div className="nav-left">
        <i onClick={sidebarHandler} className="fa-solid fa-bars"></i>
        <div className="logo">
          <span>HRMS</span>
        </div>
      </div>
      {/* <form className='searchbar' onSubmit={handleSubmit}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
                type="text"
                placeholder="Search..."
            />
        </form> */}
      <div className="nav-right">
      <button className="logout" onClick={()=>{
           navigate('/login')
        }}>logout</button>
      </div>
    </nav>
  );
};
