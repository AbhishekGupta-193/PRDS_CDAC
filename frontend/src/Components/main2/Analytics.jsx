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
                    <th className="AnEAC-th">Overall Performance</th>
                    <th className="AnEAC-th">Remark</th>
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
                            ].scoreOfEvaluation.dateofIssueofAPAR
                          ).toLocaleDateString()}
                        </td>
                        <td className="AnEAC-td">
                          {new Date(
                            user.quarter[
                              user.quarter.length - 1
                            ].scoreOfEvaluation.dateOfFillingSelfAppraisalForm
                          ).toLocaleDateString()}
                        </td>
                        <td className="AnEAC-td">
                          {new Date(
                            user.quarter[
                              user.quarter.length - 1
                            ].scoreOfEvaluation.dateOfFillingEvaluationForm
                          ).toLocaleDateString()}
                        </td>
                        <td className="AnEAC-td">
                          {user.quarter[user.quarter.length - 1]
                            .scoreOfEvaluation.sc1 +
                            user.quarter[user.quarter.length - 1]
                              .scoreOfEvaluation.sc2 +
                            user.quarter[user.quarter.length - 1]
                              .scoreOfEvaluation.sc3 +
                            user.quarter[user.quarter.length - 1]
                              .scoreOfEvaluation.sc4 +
                            user.quarter[user.quarter.length - 1]
                              .scoreOfEvaluation.sc5 +
                            user.quarter[user.quarter.length - 1]
                              .scoreOfEvaluation.sc6}
                        </td>
                        <td className="AnEAC-td">
                          {user.quarter[user.quarter.length - 1]
                            .scoreOfEvaluation.totalScore < 40
                            ? "Need Improvement"
                            : user.quarter[user.quarter.length - 1]
                                .scoreOfEvaluation.totalScore < 60
                            ? "Satisfactory"
                            : user.quarter[user.quarter.length - 1]
                                .scoreOfEvaluation.totalScore < 80
                            ? "Good"
                            : "Excellent"}
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
