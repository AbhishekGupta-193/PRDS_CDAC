import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../StateContext.js";
import { useNavigate } from "react-router-dom";
import "./Reporting.css";
import { useLocation } from "react-router-dom";

export const Reporting = () => {
  const { user, setuser, curuser, setcuruser, setCurEmp, loading } =
    useGlobalContext();
  const navigate = useNavigate();
  const [usersForEvaluation, setusersForEvaluation] = useState([]);
  // var usersForEvaluation = [];

  const getuserforreporting = () => {
  
      const Reporting_emp = user.filter((userData) => {
        const lastQuarter = userData.quarter[userData.quarter.length - 1]; 
        return (
          lastQuarter.APAR_status === true &&
          lastQuarter.SelfAppraisal_status === true &&
          lastQuarter.groupHead_email ===  curuser.email
        );
      });
      
      setusersForEvaluation(Reporting_emp);
    
  };
  const getData = async () => {
    try {
      const empId = JSON.parse(localStorage.getItem("empId"));
      const { data } = await axios.post("http://localhost:5000/getCurUser", {
        empId,
      });
      setcuruser(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
    getuserforreporting();
  }, [user]);


  const EvaluationFormHandler = (User) => {
    setCurEmp(User);
    localStorage.setItem("EmployeeId", JSON.stringify(User.empId))

    navigate("/form/Evaluation" );
  };

  return (
    <div className="REmployeeAnalyticsContainer">
      {!loading ? (
        <div className='Rtable-down'>
          {curuser?.Role.Reporting_Officer ? (
            <div className="REAC">
              <div className="REAC-head">Evaluation request for</div>
              {usersForEvaluation ? (
                <table className="REAC-table">
                  <thead>
                    <tr className="REAC-tr1">
                      <th className="REAC-th">Employee Id</th>
                      <th className="REAC-th">Name</th>
                      <th className="REAC-th">Last Date to fill Form</th>
                      <th className="REAC-th">Form</th>

                    </tr>
                  </thead>
                  <tbody>
                    {usersForEvaluation.map((user) => (
                      <tr key={user._id} className="REAC-tr">
                        <td className="REAC-td">{user.empId}</td>
                        <td className="REAC-td">{user.userName}</td>
                        <td className="REAC-td">{new Date(user.quarter[user.quarter.length - 1].dateofReviewbyRPO).toLocaleDateString()}</td>
                        <td className="REAC-td">
                          <button onClick={() => EvaluationFormHandler(user)} className="REAC-button">
                            Fill Evaluation form
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No users for evaluation.</p>
              )}
            </div>
          ) : (
            "You don't have any access to view this page"
          )}

        </div>
      ) : (
        "Loading the data"
      )}
    </div>
  );
};
