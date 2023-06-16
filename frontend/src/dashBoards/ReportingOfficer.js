import React, { useContext } from 'react'
import StateContext from '../StateContext';
import { useNavigate } from 'react-router-dom'
// import { Evaluation_form } from '../form/Evaluation/Evaluation_form.jsx'

const ReportingOfficer = () => {
    const navigate = useNavigate();
    const { user, empReq } = useContext(StateContext);
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
                    <div className="card">
                        <h2>Recent Requests</h2>

                        {empReq.map((e, index) =>
                            <div className="action">
                                <p>Request from : {e.email}</p>
                                {/* {e.filledByHr && e.filledByEmployee ? <button onClick={navigate("/Evaluation_form ")}>Fill Evaluation form</button> : <p>already filled</p>} */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportingOfficer
