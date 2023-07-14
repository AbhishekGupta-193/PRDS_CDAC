import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../StateContext";
import { Graph } from "./Graph";
import axios from "axios";
import "./EmployeeAnalytics.css";
import { BASE_URL } from '../Config.js';


export const EmployeeAnalytics = () => {
  const { curuser, setcuruser } = useGlobalContext();
  const [clickedRowIndex, setClickedRowIndex] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const empId = JSON.parse(localStorage.getItem("empId"));
        const { data } = await axios.post( BASE_URL + "getCurUser", {
          empId,
        });
        setcuruser(data);
        console.log(curuser);
      } catch (error) {
        console.error(error);
      }
    };
    if (!curuser) {
    }
    getData();
  }, []);
  const extraDetails = (index) => {
    return (
      <div className="EAC-extra-details-row-td">
        <div className="EAC-extra-details-row-td-1">
          <strong>Score for Each Category (out of 10)</strong>
          <p>
            Technical Knowledge & skills, demonstrates originality & Quality of
            work done : {curuser.quarter[index].scoreOfEvaluation.sc1}
          </p>
          <p>
            {" "}
            Possess Conceptual Ability. Analyzes problem effectively & finds
            creative solution to problems :{" "}
            {curuser.quarter[index].scoreOfEvaluation.sc2}
          </p>
          <p>
            Shows interest in work, learns quickly & Takes initiative :{" "}
            {curuser.quarter[index].scoreOfEvaluation.sc3}
          </p>
          <p>
            Punctuality, Behavior & Professional Attitude :{" "}
            {curuser.quarter[index].scoreOfEvaluation.sc4}
          </p>
          <p>
            Open to Criticism & Able to work well with others :{" "}
            {curuser.quarter[index].scoreOfEvaluation.sc5}
          </p>
          <p>
            Communication Skills - oral and written :{" "}
            {curuser.quarter[index].scoreOfEvaluation.sc6}
          </p>
        </div>
        <div className="EAC-extra-details-row-td-2">
          {/* <p>
            <strong>Remark :</strong> {curuser.quarter[index].remark}{" "}
          </p> */}
          <p>
            <strong>Employee Final Remark :</strong>{" "}
            {curuser.quarter[index].employeeFinalRemark === "1a" ?"High Achiever" : ""}
          </p>
          <div className="EAC-extra-details-row-td-21">
            <p>
              <strong>Additional Comments :</strong>
            </p>
            <span>{curuser.quarter[index].additionalComments}</span>
          </div>
        </div>
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
      {curuser ? (
        <div className="EmployeeAnalyticsContainer">
          <div className="graph-up">
            <Graph />
          </div>
          <div className="table-down">
            {curuser && (
              <div className="EAC">
                <table className="EAC-table">
                  <thead>
                    <tr className="EAC-tr1">
                      <th className="EAC-th">Quarter</th>
                      <th className="EAC-th">From</th>
                      <th className="EAC-th">To</th>
                      <th className="EAC-th">Total Score</th>
                      <th className="EAC-th">Final Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {curuser
                      ? curuser.quarter.map((user, index) => (
                          <React.Fragment key={index}>
                            <tr
                              className="EAC-tr"
                              style={{ curser: "pointer" }}
                              onClick={() => handleRowClick(index)}
                            >
                              <td className="EAC-td">{index + 1}</td>
                              <td className="EAC-td">
                                {new Date(
                                  user.appraiselPeriodFrom
                                ).toLocaleDateString()}
                              </td>
                              <td className="EAC-td">
                                {new Date(
                                  user.appraiselPeriodTo
                                ).toLocaleDateString()}
                              </td>
                              <td className="EAC-td">
                                {user.scoreOfEvaluation.totalScore + user.scoreOfEvaluation.selfAppraisalScore + user.scoreOfEvaluation.achievementBeyondScore }
                              </td>
                              <td className="EAC-td">
                                {user.employeeFinalRemark}
                              </td>
                            </tr>
                            {clickedRowIndex === index && (
                              <tr className="EAC-extra-details-row">
                                <td colSpan="6">{extraDetails(index)}</td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
};
