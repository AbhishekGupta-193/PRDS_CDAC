import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../StateContext";
import "./Analytics.css";
import axios from "axios";
import { BASE_URL } from '../Config.js';
import { Area } from '@ant-design/plots';



const Analytics = () => {
  const { curuser, setcuruser, user, loading } = useGlobalContext();
  const [clickedRowIndex, setClickedRowIndex] = useState(null);

  const data = [];
  const getData = async () => {
    try {
      const empId = JSON.parse(localStorage.getItem("empId"));
      const { data } = await axios.post(BASE_URL + "getCurUser", {
        empId,
      });
      setcuruser(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    slider: {
      start: 0.1,
      end: 0.9,
    } 
  };

  const extraDetails = (index) => {
    const aObjects = user[index]?.quarter.map((quarter, index) => ({
      type: "Total Score",
      date: `Quarter ${index + 1}`,
      value: quarter.scoreOfEvaluation.totalScore
    }));

    const bObjects = user[index]?.quarter.map((quarter, index) => ({
      type: "Self Appraisal Score",
      date: `Quarter ${index + 1}`,
      value: quarter.scoreOfEvaluation.selfAppraisalScore
    }));

    const cObjects = user[index]?.quarter.map((quarter, index) => ({
      type: "Achievement Beyond Scope Score",
      date: `Quarter ${index + 1}`,
      value: quarter.scoreOfEvaluation.achievementBeyondScore
    }));

    data.push(...aObjects, ...bObjects, ...cObjects);
    return (
      <div>
        <Area {...config} />
        {/* <p>hello</p> */}
      </div>
    );
  };
  const handleRowClick = (index) => {
    if (clickedRowIndex === index) {
      setClickedRowIndex(null);
    } else {
      setClickedRowIndex(index);
    }
  };

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
                      <React.Fragment key={index}>
                        <tr className="AnEAC-tr"
                          // style={{ curser: "pointer" }}
                          onClick={() => handleRowClick(index)}
                        >
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
                                .scoreOfEvaluation.totalScore + 
                                user.quarter[user.quarter.length - 1]
                                .scoreOfEvaluation.selfAppraisalScore + 
                                user.quarter[user.quarter.length - 1]
                                .scoreOfEvaluation.achievementBeyondScore
                            }
                          </td>
                          <td className="AnEAC-td">
                          {
                              user.quarter[user.quarter.length - 1]
                                .scoreOfEvaluation.totalScore_bySLA + 
                                user.quarter[user.quarter.length - 1]
                                .scoreOfEvaluation.selfAppraisalScore_bySLA + 
                                user.quarter[user.quarter.length - 1]
                                .scoreOfEvaluation.achievementBeyondScore_bySLA
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
                        {clickedRowIndex === index && (
                          <tr>
                            <td colSpan="9" className="AnEAC-extra-details-row">{extraDetails(index)}</td>
                          </tr>
                        )}
                      </React.Fragment>
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