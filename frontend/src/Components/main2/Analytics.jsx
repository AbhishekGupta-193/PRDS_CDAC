import React from "react";
import { useGlobalContext } from "../../StateContext";
import "../../css/analytics.css";

const Analytics = () => {
  const { curuser, alluser } = useGlobalContext();

  return (
    <>
      {curuser.Role.HR && (
        <div className="tc">
          <table className="tb">
            <caption className="cp">EMPLOYEE's PERFORMANCE</caption>
            <thead className="sticky-header">
              <tr className="trr">
                <th className="thh">Emp ID</th>
                <th className="thh">Name</th>
                <th className="thh">Self Appraisal</th>
                <th className="thh">Acheivement Beyond Normal Scope Of Work</th>
                <th className="thh">Reporting Officer Score</th>
                <th className="thh">Overall Performance</th>
              </tr>
            </thead>
            <tbody>
              {alluser.map((user, index) => (
                <tr className="trr" key={index}>
                  <td className="tdd">{user.empId}</td>
                  <td className="tdd">{user.userName}</td>
                  <td className="tdd">
                    {user.scoreOfEvaluation.selfAppraisalScore}
                  </td>
                  <td className="tdd">
                    {user.scoreOfEvaluation.achievementBeyondScore}
                  </td>
                  <td className="tdd">
                    {user.scoreOfEvaluation.sc1 +
                      user.scoreOfEvaluation.sc2 +
                      user.scoreOfEvaluation.sc3 +
                      user.scoreOfEvaluation.sc4 +
                      user.scoreOfEvaluation.sc5 +
                      user.scoreOfEvaluation.sc6}
                  </td>
                  <td className="tdd">
                    {user.scoreOfEvaluation.totalScore - "0" < 40
                      ? "need"
                      : user.scoreOfEvaluation.totalScore - "0" < 60
                      ? "Satisfactory"
                      : user.scoreOfEvaluation.totalScore - "0" < 80
                      ? "Good"
                      : "Excellent"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Analytics;
