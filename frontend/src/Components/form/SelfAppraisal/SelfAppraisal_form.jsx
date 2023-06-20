// import React, { useContext } from 'react'
// import "./SelfAppraisal_form.css"
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'
// import { useGlobalContext } from '../../../StateContext';


import React, { useState } from "react";
import "./SelfAppraisal_form.css";
const SelfAppraisalForm = () => {
  const [name, setName] = useState("");
  const [employeeid, setemployeeid] = useState("");
  const [period, setperiod] = useState("");
  const [projectname, setprojectname] = useState("");
  const [achievement1, setachievement1] = useState("");
  const [deliverable, setdeliverable] = useState("");
  const [sign, setsign] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleemployeeidChange = (e) => {
    setemployeeid(e.target.value);
  };

  const handleperiodChange = (e) => {
    setperiod(e.target.value);
  };
  const handleprojectnameChange = (e) => {
    setprojectname(e.target.value);
  };
  const handleachievement1Change = (e) => {
    setachievement1(e.target.value);
  };
  const handledeliverableChange = (e) => {
    setdeliverable(e.target.value);
  };
  const handlesignChange = (e) => {
    setsign(e.target.value);
  };
  const DynamicRowAddition = () => {
    const [rows, setRows] = useState([]);

    const addRow = () => {
      const newRow = {
        serialNumber: rows.length + 1,
        jobAssigned: "",
        achievement: "",
      };

      setRows([...rows, newRow]);
    };

    const handleJobAssignedChange = (event, index) => {
      const updatedRows = [...rows];
      updatedRows[index].jobAssigned = event.target.value;
      setRows(updatedRows);
    };

    const handleAchievementChange = (event, index) => {
      const updatedRows = [...rows];
      updatedRows[index].achievement = event.target.value;
      setRows(updatedRows);
    };

    return (
      <div className="parent_jasa">
        <h4 className="title_ja_sa">
          Job Assignments and Specific Achievements
        </h4>
        {rows.map((row, index) => (
          <div key={index} className="row-container">
            <div className="serial-number">{row.serialNumber} </div>
            <input
              type="text"
              className="job_ass"
              placeholder="JOB ASSIGNED"
              value={row.jobAssigned}
              onChange={(event) => handleJobAssignedChange(event, index)}
            />
            <input
              type="text"
              className="spe_ach"
              placeholder="CORRESPONDING ACHIEVEMENT"
              value={row.achievement}
              onChange={(event) => handleAchievementChange(event, index)}
            />
          </div>
        ))}
        {rows.length === 0 && (
          <div className="initial_msg">
            Click on Add button to start adding your data
          </div>
        )}

        <div className="parent_jasa_btn">
          <button className="btn_ja_sa" onClick={addRow}>
            Add
          </button>
        </div>
      </div>
    );
  };
  const DynamicRowAddition2 = () => {
    const [rows, setRows] = useState([]);

    const addRow = () => {
      const newRow = {
        serialNumber: rows.length + 1,
        jobAssigned: "",
        achievement: "",
      };

      setRows([...rows, newRow]);
    };

    const handleJobAssignedChange = (event, index) => {
      const updatedRows = [...rows];
      updatedRows[index].jobAssigned = event.target.value;
      setRows(updatedRows);
    };

    const handleAchievementChange = (event, index) => {
      const updatedRows = [...rows];
      updatedRows[index].achievement = event.target.value;
      setRows(updatedRows);
    };

    return (
      <div className="parent_jasa">
        <h4 className="title_ja_sa">
          Achievements beyond normal scope of work
        </h4>
        {rows.map((row, index) => (
          <div key={index} className="row-container">
            <div className="serial-number">{row.serialNumber} </div>
            <input
              type="text"
              className="job_ass"
              placeholder="ACHIEVEMENTS"
              value={row.jobAssigned}
              onChange={(event) => handleJobAssignedChange(event, index)}
            />
            <input
              type="text"
              className="spe_ach"
              placeholder="DELIVERABLES"
              value={row.achievement}
              onChange={(event) => handleAchievementChange(event, index)}
            />
          </div>
        ))}
        {rows.length === 0 && (
          <div className="initial_msg">
            Click on Add button to start adding your data
          </div>
        )}
        <div className="parent_jasa_btn">
          <button className="btn_ja_sa" onClick={addRow}>
            Add
          </button>
        </div>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form submission
    console.log("Submitted:", {
      name,
      employeeid,
      period,
      projectname,
      achievement1,
    });
    // Reset the form fields
    setName("");
    setemployeeid("");
    setperiod("");
    setprojectname("");
    setachievement1("");
    setdeliverable("");
    setsign("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="body">
        <div className="header">
          <div className="main">
            <div className="head_saf">
              <h1>Self Appraisal Form</h1>
            </div>

            <div className="one">
              <div className="employeename">
                <h5 className="title1">Name of the Employee:</h5>
                <input
                  type="text "
                  className="text1"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="employeeid">
                <h5 className="title2">Employee ID:</h5>
                <input
                  type="text"
                  className="text2"
                  value={employeeid}
                  onChange={handleemployeeidChange}
                  required
                />
              </div>
            </div>

            <div className="two">
              <div className="period_saf">
                <h5>Self appraisal for the period:</h5>
              </div>
              <div className="textfill">
                {/* <label htmlFor="from">From:</label> */}
                <input type="text" placeholder="From:" className="from1" />

                {/* <label htmlFor="from">To:</label> */}
                <input type="text" placeholder="To:" className="from2" />
              </div>
            </div>

            <div className="three">
              <div className="projectname">
                <h5>Project Name:</h5>
              </div>

              <input
                type="text"
                className="Text3"
                value={projectname}
                onChange={handleprojectnameChange}
                required
              />
            </div>
          </div>
          <div className="ja_sa">{DynamicRowAddition()}</div>
          {/* <div className='bottom'>
                    <div className='part1'>
                        <h5>Achievement beyond normal scope of work</h5>
                        <input type="text" className='achievement1'
                            value={achievement1}
                            onChange={handleachievement1Change}
                            required
                        />
                    </div>
                    <div className='part2'>
                        <h5>Deliverables</h5>
                        <input type="text" className='deliverable'
                            value={deliverable}
                            onChange={handledeliverableChange}
                            required
                        />
                    </div>

                </div> */}
          <div className="bottom">{DynamicRowAddition2()}</div>
          <div className="last">
            <div className="signature">
              <h5 className="sign_title">Signature of the Employee</h5>
              <input
                type="text"
                className="sign"
                value={sign}
                onChange={handlesignChange}
                required
              />
            </div>
            <div className="Date">
              <h5 className="Date_title">Date</h5>
              <input
                type="date"
                className="date1"
                // value={sign}
                // onChange={handleDateChange}
                // required
              />
            </div>
          </div>
          <div className="btn_saf">
            <button className="last_btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default SelfAppraisalForm;
