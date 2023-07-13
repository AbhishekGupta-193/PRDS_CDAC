import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../StateContext.js";
import { useNavigate } from "react-router-dom";
import "./Reporting.css";
import { useLocation } from "react-router-dom";
import { BASE_URL } from '../Config.js';


export const Reporting = () => {
  const { user, setuser, curuser, setcuruser, setCurEmp, loading } =
    useGlobalContext();
  const navigate = useNavigate();
  const [usersForEvaluation, setusersForEvaluation] = useState(null);
  const [usersForEvaluationbySLA, setusersForEvaluationbySLA] = useState(null);

  const getuserforreporting = () => {
    const Reporting_emp = user?.filter((userData) => {
      const lastQuarter = userData.quarter[userData.quarter.length - 1];
      return (
        lastQuarter.APAR_status === true &&
        lastQuarter.SelfAppraisal_status === true &&
        lastQuarter.groupHead_email === curuser?.email
      );
    });
    setusersForEvaluation(Reporting_emp);
    const Reporting_emp_bySLA = user?.filter((userData) => {
      const lastQuarter = userData.quarter[userData.quarter.length - 1];
      return (
        lastQuarter.APAR_status === true &&
        lastQuarter.SelfAppraisal_status === true &&
        lastQuarter.Evalutation_status === true &&
        lastQuarter.SLA_email === curuser?.email
      );
    });
    setusersForEvaluationbySLA(Reporting_emp_bySLA);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const empId = JSON.parse(localStorage.getItem("empId"));
        const { data } = await axios.post( BASE_URL + "getCurUser", {
          empId,
        });
        setcuruser(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (!curuser) {
      getData();
    }
    getuserforreporting();
  }, [user,curuser]);

  const EvaluationFormHandler = (User) => {
    setCurEmp(User);
    localStorage.setItem("EmployeeId", JSON.stringify(User.empId));

    navigate("/form/Evaluation");
  };
  const EvaluationFormHandlerbySLA = (User) => {
    setCurEmp(User);
    localStorage.setItem("EmployeeId", JSON.stringify(User.empId));

    navigate("/form/Evaluation2");
  };

  return (
    <>
      {curuser && curuser.Role.Reporting_Officer ? (
        <div className="REmployeeAnalyticsContainer">
          {!loading ? (
            <div className="Rtable-down">
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
                      {usersForEvaluation?.map((user) => (
                        <tr key={user._id} className="REAC-tr">
                          <td className="REAC-td">{user.empId}</td>
                          <td className="REAC-td">{user.userName}</td>
                          <td className="REAC-td">
                            {new Date(
                              user.quarter[
                                user.quarter.length - 1
                              ].dateofReviewbyRPO
                            ).toLocaleDateString()}
                          </td>
                          <td className="REAC-td">
                            <button
                              onClick={() => EvaluationFormHandler(user)}
                              className="REAC-button"
                            >
                              Fill Evaluation form
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <tr>No users for evaluation.</tr>
                )}
              </div>
            </div>
          ) : (
            " .............Loading.............. "
          )}
        </div>
      ) : (
        <div className="REmployeeAnalyticsContainer">
          {!loading ? (
            <div className="Rtable-down">
              <div className="REAC">
                <div className="REAC-head">Evaluation request for</div>
                {usersForEvaluationbySLA ? (
                  <table className="REAC-table">
                    <thead>
                      <tr className="REAC-tr1">
                        <th className="REAC-th">Employee Id</th>
                        <th className="REAC-th">Name</th>
                        <th className="REAC-th">Last Date to Review Form</th>
                        <th className="REAC-th">Form</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersForEvaluationbySLA?.map((user) => (
                        <tr key={user._id} className="REAC-tr">
                          <td className="REAC-td">{user.empId}</td>
                          <td className="REAC-td">{user.userName}</td>
                          <td className="REAC-td">
                            {new Date(
                              user.quarter[
                                user.quarter.length - 1
                              ].dateofReviewbyRPO
                            ).toLocaleDateString()}
                          </td>
                          <td className="REAC-td">
                            <button
                              onClick={() => EvaluationFormHandlerbySLA(user)}
                              className="REAC-button"
                            >
                              view Evaluation form
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <tr>No users for evaluation.</tr>
                )}
              </div>
            </div>
          ) : (
            " .............Loading.............. "
          )}
        </div>
      )}
    </>
  );
};
