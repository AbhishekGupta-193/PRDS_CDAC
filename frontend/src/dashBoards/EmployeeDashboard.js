import React from 'react'
import axios from 'axios'
import StateContext from '../StateContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import './Dash1.css'


const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(StateContext);

  const generate = () => {
    axios.post("http://localhost:5000/updateRequest", user)
      .then(res => {
        alert("request send");
        // navigate("/Dash2");
        // console.log(res.data);
        setUser(res.data);
      })
  }
  const fillForrm = () => {
    navigate("/SelfAppraisal ");
  }


  return (
    <div>
      <div className="navbar">
        <ul>
          <li><a href="/">Dashboard</a></li>
          <li><a href="/">Employees</a></li>
          <li><a href="/">Departments</a></li>
          <li><a href="/">Reports</a></li>
          <li><a href="/">Settings</a></li>
        </ul>
      </div>
      <div className="containerDash">
        <div className="card">
          <h2>Welcome, {user.email}</h2>
          <div className="action">
            {/* <button onClick={generate}>{user.request ? <h4>Request already send to hr</h4> : <h4>Send Request to HR</h4>}</button> */}
            <button onClick={generate}>
              {!user.request && !user.filledByHr ? <h4>Send Request to HR</h4> : (user.request && !user.filledByHr ? <h4>Request already send to hr</h4> : <h4>Form has been filled by hr</h4>)}
            </button>
            <br />
            <div className="action">
              <button onClick={fillForrm}>Fill your self appraisel form</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
