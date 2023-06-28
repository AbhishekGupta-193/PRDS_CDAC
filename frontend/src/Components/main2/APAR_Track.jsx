import React, { useState } from "react";
import "./APAR_Track.css";

const APAR_Track = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(
    JSON.parse(localStorage.getItem("allusers"))
  );

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredData = data.filter((item) => {
      return item.employeeId.toLowerCase().includes(searchTerm);
    });
    setFilteredData(filteredData);
  };

  return (
    <div className="note_wrapper">
      <input
        type="text"
        id="search"
        placeholder="Search by employee ID"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="APAR_track_table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Employee ID</th>
            <th>Group Name</th>
            <th>Issue Date</th>
            <th>Date of Completion by Employee</th>
            <th>Date of Completion of Reporting</th>
            <th>Status of Completion by Employee</th>
            <th>Status of Completion by Reporting Officer</th>
            <th>APAR Initiated</th>
          </tr>
        </thead>
        <tbody className="APAR_track_table">
          {filteredData.map((item, index) => {
            const dateofSubmission = new Date(
              item.dateofSubmission
            ).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            const dateofIssueofAPAR = new Date(
              item.dateofIssueofAPAR
            ).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            const dateofReviewbyRPO = new Date(
              item.dateofReviewbyRPO
            ).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.empId}</td>
                <td>{item.group}</td>
                <td>{dateofSubmission}</td>
                <td>{dateofIssueofAPAR}</td>
                <td>{dateofReviewbyRPO}</td>
                <td>{item.SelfAppraisal_status}</td>
                <td>{item.Evalutation_status}</td>
                <td>{item.aparInitiated}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default APAR_Track;

