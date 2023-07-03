import React, { useEffect } from "react";
import { useGlobalContext } from "../../StateContext";
import "./Analytics.css";
import axios from "axios";

const Analytics = () => {
  const { curuser, setcuruser, user, loading } = useGlobalContext();
  const getData = async () => {
    try {
      const empId = JSON.parse(localStorage.getItem("empId"));
      const { data } = await axios.post("http://localhost:5000/getCurUser", {
        empId,
      });
      setcuruser(data);
      console.log(curuser);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!loading ? (
        <div className="AnEmployeeAnalyticsContainer">
          <caption className="Ancp">EMPLOYEE's PERFORMANCE</caption>
          {curuser && curuser.Role.HR && (
            <div className="AnEAC">
              <table className="AnEAC-table">
                <thead className="Ansticky-header">
                  <tr className="AnEAC-tr1">
                    <th className="AnEAC-th">Emp ID</th>
                    <th className="AnEAC-th">Name</th>
                    <th className="AnEAC-th">Issue date of APAR</th>
                    <th className="AnEAC-th">Completion date by employee</th>
                    <th className="AnEAC-th">Completion date by FLA</th>
                    <th className="AnEAC-th">
                      Overall Performance evalutaed by FLA
                    </th>
                    <th className="AnEAC-th">
                      Overall Performance evalutaed by SLA
                    </th>
                    <th className="AnEAC-th">Remark by FLA</th>
                    <th className="AnEAC-th">Remark by SLA</th>
                  </tr>
                </thead>
                <tbody>
                  {user ? (
                    user.map((user, index) => (
                      <tr className="AnEAC-tr" key={index}>
                        <td className="AnEAC-td">{user.empId}</td>
                        <td className="AnEAC-td">{user.userName}</td>
                        <td className="AnEAC-td">
                          {new Date(
                            user.quarter[
                              user.quarter.length - 1
                            ].dateofIssueofAPAR
                          ).toLocaleDateString()}
                        </td>
                        <td className="AnEAC-td">
                          {new Date(
                            user.quarter[
                              user.quarter.length - 1
                            ].dateOfFillingSelfAppraisalForm
                          ).toLocaleDateString()}
                        </td>
                        <td className="AnEAC-td">
                          {new Date(
                            user.quarter[
                              user.quarter.length - 1
                            ].dateOfFillingEvaluationForm
                          ).toLocaleDateString()}
                        </td>
                        <td className="AnEAC-td">
                          {
                            user.quarter[user.quarter.length - 1]
                              .scoreOfEvaluation.totalScore
                          }
                        </td>
                        <td className="AnEAC-td">
                          {
                            user.quarter[user.quarter.length - 1]
                              .scoreOfEvaluation.totalScore_bySLA
                          }
                        </td>
                        <td className="AnEAC-td">
                          {user.quarter[user.quarter.length - 1]
                            .employeeFinalRemark
                            ? "Need Improvement"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark
                            ? "Satisfactory"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark
                            ? "Good"
                            : "Excellent"}
                          <br />
                          {user.quarter[user.quarter.length - 1]
                            .employeeFinalRemark === "1c"
                            ? "Poor Performance High potential"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark === "1b"
                            ? "Good performance High potential"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark === "1a"
                            ? "Outstanding performance High potential"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark === "2c"
                            ? "Poor Performance Moderate potential"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark === "2b"
                            ? "Good performance Moderate potential"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark === "2a"
                            ? "Outstanding performance Moderate potential"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark === "3c"
                            ? "Poor performance limited potential"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark === "3b"
                            ? "Good performance limited potential"
                            : "Outstanding performance limited potential"}
                        </td>
                        <td className="AnEAC-td">
                          {user.quarter[user.quarter.length - 1]
                            .employeeFinalRemark_bySLA
                            ? "Need Improvement"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark_bySLA
                            ? "Satisfactory"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark_bySLA
                            ? "Good"
                            : "Excellent"}
                          <br />
                          {user.quarter[user.quarter.length - 1]
                            .employeeFinalRemark_bySLA === "1c"
                            ? "Poor Performance High potential"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark_bySLA === "1b"
                            ? "Good performance High potential"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark_bySLA === "1a"
                            ? "Outstanding performance High potential"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark_bySLA === "2c"
                            ? "Poor Performance Moderate potential"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark_bySLA === "2b"
                            ? "Good performance Moderate potential"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark_bySLA === "2a"
                            ? "Outstanding performance Moderate potential"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark_bySLA === "3c"
                            ? "Poor performance limited potential"
                            : user.quarter[user.quarter.length - 1]
                                .employeeFinalRemark_bySLA === "3b"
                            ? "Good performance limited potential"
                            : "Outstanding performance limited potential"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">Loading...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        "Loading the Analytics"
      )}
    </>
  );
};

export default Analytics;
