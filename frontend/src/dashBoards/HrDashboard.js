import React, { useContext, useEffect } from 'react'
import './Dash1.css'
import { useNavigate } from 'react-router-dom'
import StateContext from '../StateContext';
import axios from 'axios';

const HrDashboard = () => {
  const navigate = useNavigate();
  const { user, empReq, setEmpReq, setReqUserId } = useContext(StateContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getRequests")
      .then(({ data }) => {
        console.log('data ---> ', data);
        setEmpReq(data);
      })
  }, [])
  const fillForrm = (index) => {
    setReqUserId(index);
    // console.log({ index });
    // console.log({ empReq });
    navigate("/APAR ");
  }
  // const sendToEmployee = (e) => {
  //   axios
  //     .post("http://localhost:5000/setHrFilledForm", e)
  //     .then(({ data }) => {
  //       setEmpReq(data);
  //     })
  // }


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
          <p>You have 50 employees in your company.</p>
          <div className="action">
            <button>View Employees</button>
            <a href="/">Manage Departments</a>
          </div>
        </div>
        <div className="card">
          <h2>Recent Requests</h2>

          {empReq.map((e, index) =>
            <div className="action">
              <p>Request from : {e.email}</p>
              {!e.filledByHr ? <button onClick={() => fillForrm(index)}>Fill apprasel form</button> : <p>filled</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HrDashboard
