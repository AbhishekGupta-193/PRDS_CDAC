import React, { useState } from "react";
import "./APAR_Track.css";
import { useGlobalContext } from "../../StateContext.js";

const APAR_Track = ({ data }) => {
  //...........................Search functionality to be implemented...........................//
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filteredData, setFilteredData] = useState();
  // const handleSearch = (event) => {
  //   const searchTerm = event.target.value.toLowerCase();
  //   setSearchTerm(searchTerm);

  //   const filteredData = data.filter((item) => {
  //     return item.employeeId.toLowerCase().includes(searchTerm);
  //   });
  //   setFilteredData(filteredData);
  // };
  //...........................Search functionality to be implemented...........................//

  const { user } = useGlobalContext();

  return (
    <div className="AnEmployeeAnalyticsContainer">
      <caption className="Ancp">Employee's APAR Tracking</caption>
      {
        <div className="AnEAC">
          <table className="AnEAC-table">
            <thead className="Ansticky-header">
              <tr className="AnEAC-tr1">
                <th className="AnEAC-th">Emp ID</th>
                <th className="AnEAC-th">Name</th>
                <th className="AnEAC-th">Issue Date</th>
                <th className="AnEAC-th">Completion date for employee</th>
                <th className="AnEAC-th">Completion date for FLA</th>
                <th className="AnEAC-th">Status of completion by employee </th>
                <th className="AnEAC-th">Status of completion by FLA </th>
                <th className="AnEAC-th">Status of completion by SLA </th>
              </tr>
            </thead>
            <tbody>
              {user ? (
                user.map((element, index) => (
                  <tr className="AnEAC-tr" key={index}>
                    <td className="AnEAC-td">{element.empId}</td>
                    <td className="AnEAC-td">{element.userName}</td>
                    <td className="AnEAC-td">
                      {
                        new Date(element.quarter[element.quarter.length - 1]
                          .dateofIssueofAPAR).toLocaleDateString()
                      }
                    </td>
                    <td className="AnEAC-td">
                      {
                       new Date( element.quarter[element.quarter.length - 1]
                        .dateofSubmission).toLocaleDateString()
                      }
                    </td>
                    <td className="AnEAC-td">
                      {
                       new Date( element.quarter[element.quarter.length - 1]
                        .dateofReviewbyRPO).toLocaleDateString()
                      }
                    </td>
                    <td className="AnEAC-td">
                      {
                        element.quarter[element.quarter.length - 1]
                          .SelfAppraisal_status === false ? "Pending" : "Completed"
                      }
                    </td>
                    <td className="AnEAC-td">
                      {
                        element.quarter[element.quarter.length - 1]
                          .Evalutation_status === false ? "Pending" : "Completed"
                      }
                    </td>
                    <td className="AnEAC-td">
                    {
                        element.quarter[element.quarter.length - 1]
                          .Evalutation_status_bySLA === false ? "Pending" : "Completed"
                      }

                    </td>
                  </tr>
                ))
              ) : (
                <tr className="AnEAC-tr">
                  <td colSpan="6">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};

export default APAR_Track;
