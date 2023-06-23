import React, { useEffect, useState, useContext } from "react";
import "./Evaluation_form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../StateContext.js";
import validator from "validator";

export const Evaluation_form = () => {
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [Remark,setRemark] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const { CurEmp, setCurEmp } = useGlobalContext();
  const DateFrom = new Date(CurEmp.appraiselPeriodFrom);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const From = DateFrom.toLocaleDateString(undefined, options);
  const DateTo = new Date(CurEmp.appraiselPeriodTo);
  const To = DateTo.toLocaleDateString(undefined, options);
  console.log(CurEmp);

  // useEffect(()=>{
  //   setCurEmp(location.state?.User)
  //   console.log(CurEmp);
  // })
  // const [CurEmp, setCurEmp] = useState({
  //   appraiselPeriodFrom: "",
  //   appraiselPeriodTo: "",
  //   CurEmpName: "",
  //   designation: "",
  //   groupHead: "",
  //   scoreOfEvaluation: {
  //     "sc1": 0,
  //     "sc2": 0,
  //     "sc3": 0,
  //     "sc4": 0,
  //     "sc5": 0,
  //     "sc6": 0,
  //     "totalScore": 0,
  //   },
  //   "selfAppraisalScore": "",
  //   "achievementBeyondScore": "",
  //   "additionalComments": "Great job overall!",
  //   "totalScore": ""
  // })

  const validateForm = () => {
    const errors = {};
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const alphabetRegex = /^[A-Za-z]+$/;

    // if (!CurEmp.appraiselPeriodFrom) {
    //   errors.appraiselPeriodFrom = "*This is required";
    // } else if (!dateRegex.test(CurEmp.appraiselPeriodFrom)) {
    //   errors.appraiselPeriodFrom = "*Numeric input is required";
    // }

    // // ----------------------->
    // if (!CurEmp.appraiselPeriodTo) {
    //   errors.appraiselPeriodTo = "*This is required";
    // } else if (!dateRegex.test(CurEmp.appraiselPeriodTo)) {
    //   errors.appraiselPeriodTo = "*Numeric input required";
    // }
    // // ----------------------->
    // if (validator.isEmpty(CurEmp.CurEmpName)) {
    //   errors.CurEmpName = "*Name required";
    // } else if (!alphabetRegex.test(CurEmp.CurEmpName)) {
    //   errors.CurEmpName = "*Alphabetical input required";
    // } else if (!validator.isLength(CurEmp.CurEmpName, { min: 2, max: 20 })) {
    //   errors.CurEmpName = "*characters limit";
    // }

    // // ----------------------->
    // if (validator.isEmpty(CurEmp.groupHead)) {
    //   errors.groupHead = "*GroupHead name required";
    // } else if (!alphabetRegex.test(CurEmp.groupHead)) {
    //   errors.groupHead = "*Alphabetical input required";
    // } else if (!validator.isLength(CurEmp.groupHead, { min: 2, max: 20 })) {
    //   errors.groupHead = "*characters limit ";
    // }

    // // ----------------------->
    // if (validator.isEmpty(CurEmp.designation)) {
    //   errors.designation = "*Designation is required";
    // } else if (!alphabetRegex.test(CurEmp.designation)) {
    //   errors.designation = "*Alphabetical input required";
    // } else if (!validator.isLength(CurEmp.designation, { min: 2, max: 20 })) {
    //   errors.designation = "*characters limit";
    // }

    // // ----------------------->
    // if (CurEmp.selfAppraisalScore === "") {
    //   errors.selfAppraisalScore = "*required";
    // } else if (
    //   !validator.isInt(CurEmp.selfAppraisalScore, { min: 0, max: 25 })
    // ) {
    //   errors.selfAppraisalScore = "* Should be between 0 and 25";
    // }

    // // ----------------------->
    // if (CurEmp.achievementBeyondScore === "") {
    //   errors.achievementBeyondScore = "*required";
    // } else if (
    //   !validator.isInt(CurEmp.achievementBeyondScore, { min: 0, max: 15 })
    // ) {
    //   errors.achievementBeyondScore = "*should be between 0 and 15";
    // }

    return errors;
  };

  CurEmp.totalScore =
    parseInt(CurEmp.scoreOfEvaluation.sc1) +
    parseInt(CurEmp.scoreOfEvaluation.sc2) +
    parseInt(CurEmp.scoreOfEvaluation.sc3) +
    parseInt(CurEmp.scoreOfEvaluation.sc4) +
    parseInt(CurEmp.scoreOfEvaluation.sc5) +
    parseInt(CurEmp.scoreOfEvaluation.sc6);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log({ CurEmp });
    setCurEmp({
      ...CurEmp,
      Evalutation_status: true,

    });
    const { data } = axios.post(
      "http://localhost:5000/submitEvalutaionForm",
      CurEmp
    );
    navigate("/main/Reporting");
  };
  useEffect(()=>{
    const PerformanceRemark = () => {
      let performance = "";
      if (CurEmp.totalScore >= 0 && CurEmp.totalScore <= 40) {
        performance = "Need improvement";
      } else if (CurEmp.totalScore >= 41 && CurEmp.totalScore <= 60) {
        performance = "Satisfactory";
      } else if (CurEmp.totalScore >= 61 && CurEmp.totalScore <= 80) {
        performance = "Good";
      } else if (CurEmp.totalScore >= 81 && CurEmp.totalScore <= 100) {
        performance = "Excellent";
      }
      return performance
    };
    setRemark(PerformanceRemark())

  },[CurEmp])


  return (
    <>
      <form className="container_eval">
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
                type="text"
                placeholder="FROM : DD / MM / YYYY"
                name="Aparfrom"
                value={From}
                disabled={true}
                className="inpt_tag"
              ></input>
              {/* {formErrors.appraiselPeriodFrom && <span className="error_evaluation">{formErrors.appraiselPeriodFrom}</span>} */}
            </div>
            <div className="upto">
              <input
                type="text"
                placeholder="TO : DD / MM / YYYY"
                name="Aparupto"
                value={To}
                disabled={true}
                className="inpt_tag"
              ></input>
              {/* {formErrors.appraiselPeriodTo && <span className="error_evaluation">{formErrors.appraiselPeriodTo}</span>} */}
            </div>
          </div>
        </div>
        <div className="personal_deatils">
          <div className="Table_rows">
            <span className="spantype_eva">Name of the Employee:</span>
            <input
              type="text"
              placeholder="Name"
              name="CurEmpname"
              value={CurEmp.userName}
              className="inpt_tag"
              disabled={true}
            ></input>
            {/* {formErrors.CurEmpName && <span className="pd_error_evaluation">{formErrors.CurEmpName}</span>} */}
          </div>
          <div className="Table_rows">
            <span className="spantype_eva">Name of Group Head</span>
            <input
              type="text"
              placeholder="Group Head"
              name="groupHead"
              value={CurEmp.groupHead}
              onChange={(e) =>
                setCurEmp({ ...CurEmp, groupHead: e.target.value })
              }
              className="inpt_tag"
              disabled={!isEditing}
            ></input>
            {/* {formErrors.groupHead && <span className="pd_error_evaluation">{formErrors.groupHead}</span>} */}
          </div>
          <div className="Table_rows">
            <span className="spantype_eva">Designation :</span>
            <input
              type="text"
              placeholder="designation"
              name="designation"
              value={CurEmp.designation}
              // onChange={(e) => setCurEmp({ ...CurEmp, designation: e.target.value })}
              className="inpt_tag"
              disabled={true}
            ></input>
            {/* {formErrors.designation && <span className="pd_error_evaluation">{formErrors.designation}</span>} */}
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
                  <td>
                    Technical Knowledge & skills, demonstrates originality &
                    Quality of work done
                  </td>
                  <td>
                    <input
                      type="number"
                      name="s1"
                      min="0"
                      max="10"
                      value={CurEmp.scoreOfEvaluation.sc1}
                      onChange={(e) =>
                        setCurEmp({
                          ...CurEmp,
                          scoreOfEvaluation: {
                            ...CurEmp.scoreOfEvaluation,
                            sc1: e.target.value,
                          },
                        })
                      }
                      required
                      disabled={!isEditing}
                      className="inpt_tag"
                    />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    Possess Conceptual Ability. Analyzes problem effectively &
                    finds creative solution to problems
                  </td>
                  <td>
                    <input
                      type="number"
                      name="sc2"
                      min="0"
                      max="10"
                      value={CurEmp.scoreOfEvaluation.sc2}
                      onChange={(e) =>
                        setCurEmp({
                          ...CurEmp,
                          scoreOfEvaluation: {
                            ...CurEmp.scoreOfEvaluation,
                            sc2: e.target.value,
                          },
                        })
                      }
                      required
                      disabled={!isEditing}
                      className="inpt_tag"
                    />
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    Shows interest in work, learns quickly & Takes initiative
                  </td>
                  <td>
                    <input
                      type="number"
                      name="sc3"
                      min="0"
                      max="10"
                      value={CurEmp.scoreOfEvaluation.sc3}
                      onChange={(e) =>
                        setCurEmp({
                          ...CurEmp,
                          scoreOfEvaluation: {
                            ...CurEmp.scoreOfEvaluation,
                            sc3: e.target.value,
                          },
                        })
                      }
                      required
                      disabled={!isEditing}
                      className="inpt_tag"
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
                      value={CurEmp.scoreOfEvaluation.sc4}
                      onChange={(e) =>
                        setCurEmp({
                          ...CurEmp,
                          scoreOfEvaluation: {
                            ...CurEmp.scoreOfEvaluation,
                            sc4: e.target.value,
                          },
                        })
                      }
                      required
                      disabled={!isEditing}
                      className="inpt_tag"
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
                      value={CurEmp.scoreOfEvaluation.sc5}
                      onChange={(e) =>
                        setCurEmp({
                          ...CurEmp,
                          scoreOfEvaluation: {
                            ...CurEmp.scoreOfEvaluation,
                            sc5: e.target.value,
                          },
                        })
                      }
                      required
                      disabled={!isEditing}
                      className="inpt_tag"
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
                      value={CurEmp.scoreOfEvaluation.sc6}
                      onChange={(e) =>
                        setCurEmp({
                          ...CurEmp,
                          scoreOfEvaluation: {
                            ...CurEmp.scoreOfEvaluation,
                            sc6: e.target.value,
                          },
                        })
                      }
                      required
                      disabled={!isEditing}
                      className="inpt_tag"
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>TOTAL MARKS OUT OF 60 : </td>
                  <td>{CurEmp.totalScore}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>PART - II</h4>
          <div className="Table_rows_cl">
            <span className="spantype_score">Self Appraisal Score :</span>
            <input
              type="number"
              placeholder="Marks Out of 25"
              min="0"
              max="25"
              name="selfAppraisalScore"
              value={CurEmp.scoreOfEvaluation.selfAppraisalScore}
              onChange={(e) =>
                setCurEmp({
                  ...CurEmp,
                  scoreOfEvaluation: {
                    ...CurEmp.scoreOfEvaluation,
                    selfAppraisalScore: e.target.value,
                  },
                })
              }
              className="inpt_tag"
              disabled={!isEditing}
              backgroundcolor="blue"
            ></input>
            {/* {formErrors.selfAppraisalScore && <span className="error_evaluation">{formErrors.selfAppraisalScore}</span>} */}
          </div>
          <h4>PART - III</h4>
          <div className="Table_rows_cl">
            <span className="spantype_score">
              Acheivement Beyond Normal Scope of Work :
            </span>
            <br />
            <input
              type="number"
              placeholder="Marks Out of 15"
              min="0"
              max="15"
              name="achievementBeyondScore"
              value={CurEmp.scoreOfEvaluation.achievementBeyondScore}
              onChange={(e) =>
                setCurEmp({
                  ...CurEmp,
                  scoreOfEvaluation: {
                    ...CurEmp.scoreOfEvaluation,
                    achievementBeyondScore: e.target.value,
                  },
                })
              }
              className="inpt_tag"
              disabled={!isEditing}
            ></input>
            {/* {formErrors.achievementBeyondScore && <span className="error_evaluation">{formErrors.achievementBeyondScore}</span>} */}
          </div>
          <p>
            TOTAL MARKS OUT OF 40 :{" "}
            {parseInt(CurEmp.scoreOfEvaluation.achievementBeyondScore) +
              parseInt(CurEmp.scoreOfEvaluation.selfAppraisalScore)}
          </p>
          <p>
            TOTAL MARKS OUT OF 100 :{" "}
            {parseInt(CurEmp.scoreOfEvaluation.achievementBeyondScore) +
              parseInt(CurEmp.scoreOfEvaluation.selfAppraisalScore) +
              parseInt(CurEmp.totalScore)}
          </p>

          <h3>
            Overall performance of the Consolidated Employee "{Remark}"
          </h3>
        </div>

        <textarea
          name="additionalComments"
          rows={4}
          maxLength={500}
          value={CurEmp.additionalComments}
          placeholder="Additional Comments,if any"
          onChange={(e) =>
            setCurEmp({ ...CurEmp, additionalComments: e.target.value })
          }
          required
          disabled={!isEditing}
          className="multiline-input"
        />

        <div className="btn_class">
          {isEditing ? (
            <button
              onClick={() => setIsEditing(!isEditing)}
              type="submit"
              className="submitbtn_apar"
            >
              submit
            </button>
          ) : (
            <div className="Edit_lock">
              <button
                onClick={() => setIsEditing(!isEditing)}
                type="submit"
                className="submitbtn_apar"
              >
                Edit
              </button>
              <button
                type="submit"
                className="submitbtn_apar"
                onClick={handleSubmit}
              >
                Lock & Submit
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default Evaluation_form;
