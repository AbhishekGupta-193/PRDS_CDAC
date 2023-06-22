import React, { useEffect, useState, useContext } from "react";
import "./Evaluation_form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../StateContext.js";
import validator from "validator";

export const Evaluation_form = () => {
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { setcuruser } = useGlobalContext();
  const { isSubmitted, setisSubmitted } = useGlobalContext();

  const [user, setuser] = useState({
    appraiselPeriodFrom: "",
    appraiselPeriodTo: "",
    userName: "",
    designation: "",
    groupHead: "",
    scoreOfEvaluation: {
      "sc1": 0,
      "sc2": 0,
      "sc3": 0,
      "sc4": 0,
      "sc5": 0,
      "sc6": 0,
      "totalScore": "",
    },
    "selfAppraisalScore": "",
    "achievementBeyondScore": "",
    "additionalComments": "Great job overall!",
    "totalScore": ""
  })

  const validateForm = () => {
    const errors = {};
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const alphabetRegex = /^[A-Za-z]+$/;

    if (!user.appraiselPeriodFrom) {
      errors.appraiselPeriodFrom = "*required";
    } else if (!dateRegex.test(user.appraiselPeriodFrom)) {
      errors.appraiselPeriodFrom = "*required";
    }

    // ----------------------->
    if (!user.appraiselPeriodTo) {
      errors.appraiselPeriodTo = "*required";
    } else if (!dateRegex.test(user.appraiselPeriodTo)) {
      errors.appraiselPeriodTo = "*required";
    }
    // ----------------------->
    if (validator.isEmpty(user.userName)) {
      errors.userName = "*required";
    }
    if (!validator.isLength(user.userName, { min: 3, max: 20 })) {
      errors.userName = "*length between 3 and 20";
    }
    if (!alphabetRegex.test(user.userName)) {
      errors.userName = "*only alphabets";
    }

    // ----------------------->
    if (validator.isEmpty(user.groupHead)) {
      errors.groupHead = "*required";
    }
    if (!validator.isLength(user.groupHead, { min: 3, max: 20 })) {
      errors.groupHead = "*length between 3 and 20";
    }
    if (!alphabetRegex.test(user.groupHead)) {
      errors.groupHead = "*only alphabets";
    }

    // ----------------------->
    if (validator.isEmpty(user.designation)) {
      errors.designation = "*required";
    }
    if (!validator.isLength(user.designation, { min: 3, max: 20 })) {
      errors.designation = "*lenght between 3 and 20";
    }
    if (!alphabetRegex.test(user.designation)) {
      errors.designation = "*only alphabets";
    }

    // ----------------------->
    if (user.selfAppraisalScore === "") {
      errors.selfAppraisalScore = "*required";
    }
    if (!validator.isInt(user.selfAppraisalScore, { min: 0, max: 25 })) {
      errors.selfAppraisalScore = "* between 0 and 25";
    }

    // ----------------------->
    if (user.achievementBeyondScore === "") {
      errors.achievementBeyondScore = "*required";
    }
    if (!validator.isInt(user.achievementBeyondScore, { min: 0, max: 15 })) {
      errors.achievementBeyondScore = "* between 0 and 15";
    }

    return errors;
  };

  user.totalScore = 0 + parseInt(user.scoreOfEvaluation.sc1) + parseInt(user.scoreOfEvaluation.sc2) + parseInt(user.scoreOfEvaluation.sc3) + parseInt(user.scoreOfEvaluation.sc4) + parseInt(user.scoreOfEvaluation.sc5) + parseInt(user.scoreOfEvaluation.sc6);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log({ user });
    navigate("/main/Reporting");

  };

  return (
    <>
      <form className="container_eval" >
        <div className="head">
          <h3>EVALUATION FORM FOR EMPLOYEES </h3>
        </div>
        <div className="period">
          <div className="title">
            <span>Report for the Period :</span>
          </div>
          <div className="content">
            <div className="from">
              <input
                type="date"
                placeholder="FROM : DD / MM / YYYY"
                name="Aparfrom"
                value={user.appraiselPeriodFrom}
                onChange={(e) => setuser({ ...user, appraiselPeriodFrom: e.target.value })}
                disabled={!isEditing}
                className="inpt"
              ></input>
              {formErrors.appraiselPeriodFrom && <span className="error">{formErrors.appraiselPeriodFrom}</span>}
            </div>
            <div className="upto">
              <input
                type="date"
                placeholder="TO : DD / MM / YYYY"
                name="Aparupto"
                value={user.appraiselPeriodTo}
                onChange={(e) => setuser({ ...user, appraiselPeriodTo: e.target.value })}
                disabled={!isEditing}
                className="inpt"
              ></input>
              {formErrors.appraiselPeriodTo && <span className="error">{formErrors.appraiselPeriodTo}</span>}
            </div>
          </div>

        </div>
        <div className="personal_deatils">
          <div className="Table_rows">
            <span>Name of the Employee:</span>
            <input
              type="text"
              placeholder="Name"
              name="username"
              value={user.userName}
              onChange={(e) => setuser({ ...user, userName: e.target.value })}
              className="inpt"
              disabled={!isEditing}
            ></input>
            {formErrors.userName && <span className="error">{formErrors.userName}</span>}
          </div>
          <div className="Table_rows">
            <span>Name of Group Head</span>
            <input
              type="text"
              placeholder="Group Head"
              name="groupHead"
              value={user.groupHead}
              onChange={(e) => setuser({ ...user, groupHead: e.target.value })}
              className="inpt"
              disabled={!isEditing}
            ></input>
            {formErrors.groupHead && <span className="error">{formErrors.groupHead}</span>}
          </div>
          <div className="Table_rows">
            <span>Designation :</span>
            <input
              type="text"
              placeholder="designation"
              name="designation"
              value={user.designation}
              onChange={(e) => setuser({ ...user, designation: e.target.value })}
              className="inpt"
              disabled={!isEditing}
            ></input>
            {formErrors.designation && <span className="error">{formErrors.designation}</span>}
          </div>
          <h4>PART - I</h4>
          <div className="table-mid">
            <table>
              <thead>
                <tr>
                  <th>Serial Number</th>
                  <th>Parameters</th>
                  <th>Marks out of 10</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Technical Knowledge & skills, demonstrates originality & Quality of work done</td>
                  <td>
                    <input
                      type="number"
                      name="s1"
                      min="0"
                      max="10"
                      value={user.scoreOfEvaluation.sc1}
                      onChange={(e) => setuser({ ...user, scoreOfEvaluation: { ...user.scoreOfEvaluation, sc1: e.target.value } })}
                      required
                      disabled={!isEditing}
                      className="inpt"
                    />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Possess Conceptual Ability. Analyzes problem effectively & finds creative solution to problems</td>
                  <td>
                    <input
                      type="number"
                      name="sc2"
                      min="0"
                      max="10"
                      value={user.scoreOfEvaluation.sc2}
                      onChange={(e) => setuser({ ...user, scoreOfEvaluation: { ...user.scoreOfEvaluation, sc2: e.target.value } })}
                      required
                      disabled={!isEditing}
                      className="inpt"
                    />
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Shows interest in work, learns quickly & Takes initiative</td>
                  <td>
                    <input
                      type="number"
                      name="sc3"
                      min="0"
                      max="10"
                      value={user.scoreOfEvaluation.sc3}
                      onChange={(e) => setuser({ ...user, scoreOfEvaluation: { ...user.scoreOfEvaluation, sc3: e.target.value } })}
                      required
                      disabled={!isEditing}
                      className="inpt"
                    />
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Punctuality, Behavior & Professional Attitude</td>
                  <td>
                    <input
                      type="number"
                      name="sc4"
                      min="0"
                      max="10"
                      value={user.scoreOfEvaluation.sc4}
                      onChange={(e) => setuser({ ...user, scoreOfEvaluation: { ...user.scoreOfEvaluation, sc4: e.target.value } })}
                      required
                      disabled={!isEditing}
                      className="inpt"
                    />
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Open to Criticism & Able to work well with others</td>
                  <td>
                    <input
                      type="number"
                      name="sc5"
                      min="0"
                      max="10"
                      value={user.scoreOfEvaluation.sc5}
                      onChange={(e) => setuser({ ...user, scoreOfEvaluation: { ...user.scoreOfEvaluation, sc5: e.target.value } })}
                      required
                      disabled={!isEditing}
                      className="inpt"
                    />
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Communication Skills - oral and written</td>
                  <td>
                    <input
                      type="number"
                      name="sc6"
                      min="0"
                      max="10"
                      value={user.scoreOfEvaluation.sc6}
                      onChange={(e) => setuser({ ...user, scoreOfEvaluation: { ...user.scoreOfEvaluation, sc6: e.target.value } })}

                      required
                      disabled={!isEditing}
                      className="inpt"
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>TOTAL MARKS OUT OF 60 : </td>
                  <td>
                    {user.totalScore}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>PART - II</h4>
          <div className="Table_rows cl">
            <span>Self Appraisel Score  :</span>
            <input
              type="number"
              placeholder="Marks Out of 25"
              min="0"
              max="25"
              name="selfAppraisalScore"
              value={user.selfAppraisalScore}
              onChange={(e) => setuser({ ...user, selfAppraisalScore: e.target.value })}
              className="inpt"
              disabled={!isEditing}
              backgroundcolor="blue"
            ></input>
            {formErrors.selfAppraisalScore && <span className="error">{formErrors.selfAppraisalScore}</span>}
          </div>
          <h4>PART - III</h4>
          <div className="Table_rows cl">
            <span>Acheivement Beyond Normal Scope of Work  :</span><br />
            <input
              type="number"
              placeholder="Marks Out of 15"
              min="0"
              max="15"
              name="achievementBeyondScore"
              value={user.achievementBeyondScore}
              onChange={(e) => setuser({ ...user, achievementBeyondScore: e.target.value })}
              className="inpt"
              disabled={!isEditing}
            ></input>
            {formErrors.achievementBeyondScore && <span className="error">{formErrors.achievementBeyondScore}</span>}
          </div>
          <p>TOTAL MARKS OUT OF 40 : {parseInt(user.achievementBeyondScore) + parseInt(user.selfAppraisalScore)}</p>
          <p>TOTAL MARKS OUT OF 100 : {parseInt(user.achievementBeyondScore) + parseInt(user.selfAppraisalScore) + user.totalScore}</p>
          <h3>Overall performance of the Consolidated Employee "Excellent"</h3>
        </div>

        <textarea
          name="additionalComments"
          rows={4}
          maxLength={500}
          value={user.additionalComments}
          placeholder="Additional Comments,if any"
          onChange={(e) => setuser({ ...user, additionalComments: e.target.value })}
          required
          disabled={!isEditing}
          className="multiline-input"
        />

        <div className="btn_class">
          {isEditing ? <button onClick={() => setIsEditing(!isEditing)} type="submit" className="submitbtn_apar">
            submit
          </button> : <div className="Edit_lock">
            <button onClick={() => setIsEditing(!isEditing)} type="submit" className="submitbtn_apar">
              Edit
            </button>
            <button type="submit" className="submitbtn_apar" onClick={handleSubmit}>
              Lock & Submit
            </button>
          </div>}
        </div>

      </form>
    </>
  );
}

export default Evaluation_form;
