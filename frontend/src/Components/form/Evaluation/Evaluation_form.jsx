import React, { useEffect, useState } from "react";
import "./Evaluation_form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../StateContext.js";
import EvaluationGrid from "./Grid";
import Grid from "./Grid";
import SelfAppraisalData from "./SelfAppraisalData";
import e from "cors";
import { useForm } from "react-hook-form";

export const Evaluation_form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [Remark, setRemark] = useState("");

  const [isEditing, setIsEditing] = useState(true);
  const { CurEmp, setCurEmp } = useGlobalContext();

  const [isVisible, setisVisible] = useState(false);

  if (CurEmp) {
    CurEmp.quarter[CurEmp.quarter.length - 1].scoreOfEvaluation.totalScore =
      parseInt(
        CurEmp.quarter[CurEmp.quarter.length - 1].scoreOfEvaluation.sc1
      ) +
      parseInt(
        CurEmp.quarter[CurEmp.quarter.length - 1].scoreOfEvaluation.sc2
      ) +
      parseInt(
        CurEmp.quarter[CurEmp.quarter.length - 1].scoreOfEvaluation.sc3
      ) +
      parseInt(
        CurEmp.quarter[CurEmp.quarter.length - 1].scoreOfEvaluation.sc4
      ) +
      parseInt(
        CurEmp.quarter[CurEmp.quarter.length - 1].scoreOfEvaluation.sc5
      ) +
      parseInt(CurEmp.quarter[CurEmp.quarter.length - 1].scoreOfEvaluation.sc6);

    var final_score =
      parseInt(
        CurEmp.quarter[CurEmp.quarter.length - 1].scoreOfEvaluation.sc1
      ) +
      parseInt(
        CurEmp.quarter[CurEmp.quarter.length - 1].scoreOfEvaluation.sc2
      ) +
      parseInt(
        CurEmp.quarter[CurEmp.quarter.length - 1].scoreOfEvaluation.sc3
      ) +
      parseInt(
        CurEmp.quarter[CurEmp.quarter.length - 1].scoreOfEvaluation.sc4
      ) +
      parseInt(
        CurEmp.quarter[CurEmp.quarter.length - 1].scoreOfEvaluation.sc5
      ) +
      parseInt(
        CurEmp.quarter[CurEmp.quarter.length - 1].scoreOfEvaluation.sc6
      ) +
      parseInt(
        CurEmp.quarter[CurEmp.quarter.length - 1]?.scoreOfEvaluation
          ?.achievementBeyondScore
      ) +
      parseInt(
        CurEmp.quarter[CurEmp.quarter.length - 1]?.scoreOfEvaluation
          ?.selfAppraisalScore
      );
  }

  const handleSubmit1 = async (e) => {
    setCurEmp({
      ...CurEmp,
      quarter: [
        {
          ...CurEmp.quarter[CurEmp.quarter.length - 1],

          Evalutation_status: true,
        },
      ],
    });
    console.log(CurEmp, "Curemp bejhne se phle");
    const { data } = axios.post(
      "http://localhost:5000/submitEvalutaionForm",
      CurEmp
    );
    localStorage.removeItem("EmployeeId");
    navigate("/main/Reporting");
  };

  const handleFormSubmit = handleSubmit(handleSubmit1);

  useEffect(() => {
    const getData = async () => {
      try {
        const EmployeeId = JSON.parse(localStorage.getItem("EmployeeId"));
        const { data } = await axios.post(
          "http://localhost:5000/getCurUserforForms",
          { EmployeeId }
        );
        console.log(data , "ye backend se aaya data hai jo curemp me set kr rhe");
        setCurEmp(data);
      } catch (error) {
        console.error(error);
      }
    };
      if(!CurEmp ){
    console.log("funcction dcalled ");
        getData();
      }
    

    const PerformanceRemark = () => {
      let performance = "";
      if (final_score >= 0 && final_score <= 40) {
        performance = "Need improvement";
      } else if (final_score >= 41 && final_score <= 60) {
        performance = "Satisfactory";
      } else if (final_score >= 61 && final_score <= 80) {
        performance = "Good";
      } else if (final_score >= 81 && final_score <= 100) {
        performance = "Excellent";
      }
      return performance;
    };
    if (CurEmp) {
      if (isVisible) {
        document
          .querySelector(".container_eval")
          .classList.add("container_eval-tl");
      } else {
        document
          .querySelector(".container_eval")
          .classList.remove("container_eval-tl");
      }
      setRemark(() => PerformanceRemark());
      console.log("current remark ", Remark);
    }
  }, [isVisible, final_score]);

  return (
    <>
      {CurEmp ? (
        <div className="Evaluation_form_wrapper">
          <form className="container_eval" onSubmit={handleFormSubmit}>
            <button
              className="SelfAppdatabtn"
              onClick={(e) => {
                e.preventDefault();
                setisVisible(!isVisible);
                console.log("aaaa", isVisible);
              }}
            >
              Click to View the Self Appraisal form Filled by {CurEmp.userName}
            </button>
            <div className="head">
              <h3>EVALUATION FORM FOR EMPLOYEES </h3>
            </div>

            <div className="Table_rows">
              <span className="spantype_eva">Report for the Period :</span>
              <div className="inpt_tag_period">
                <div className={`from ${errors.From ? "error" : ""}`}>
                  <input
                    type="text"
                    placeholder="FROM : DD / MM / YYYY"
                    name="Aparfrom"
                    value={new Date(
                      CurEmp?.quarter[
                        CurEmp?.quarter?.length - 1
                      ].appraiselPeriodFrom
                    ).toLocaleDateString()}
                    disabled={true}
                    className="inpt_tag"
                  ></input>
                </div>
                <div className={`upto ${errors.To ? "error" : ""}`}>
                  <input
                    type="text"
                    placeholder="TO : DD / MM / YYYY"
                    name="Aparupto"
                    value={new Date(
                      CurEmp?.quarter[
                        CurEmp?.quarter?.length - 1
                      ].appraiselPeriodTo
                    ).toLocaleDateString()}
                    disabled={true}
                    className="inpt_tag"
                  ></input>
                </div>
              </div>
            </div>
            <div className="personal_deatils">
              <div className={`Table_rows ${errors.userName ? "error" : ""}`}>
                <span className="spantype_eva">Name of the Employee:</span>
                <input
                  type="text"
                  placeholder="Name"
                  name="CurEmpname"
                  value={CurEmp.userName}
                  className="inpt_tag"
                  disabled={true}
                ></input>
              </div>
              <div className={`Table_rows ${errors.groupHead ? "error" : ""}`}>
                <span className="spantype_eva">Name of Group Head</span>
                <input
                  type="text"
                  placeholder="Group Head"
                  name="groupHead"
                  value={CurEmp.quarter[CurEmp.quarter.length - 1].groupHead}
                  // onChange={(e) =>
                  //   setCurEmp({ ...CurEmp, groupHead: e.target.value })
                  // }
                  className="inpt_tag"
                  disabled={true}
                ></input>
              </div>
              <div
                className={`Table_rows ${errors.designation ? "error" : ""}`}
              >
                <span className="spantype_eva">Designation :</span>
                <input
                  type="text"
                  placeholder="designation"
                  name="designation"
                  value={CurEmp.quarter[CurEmp.quarter.length - 1].designation}
                  className="inpt_tag"
                  disabled={true}
                  {...register("designation", {
                    required: "",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "",
                    },
                    maxLength: {
                      value: 20,
                      message: "",
                    },
                  })}
                ></input>
                {errors.designation && (
                  <div className="error-container">
                    <p className="error-message">
                      {errors.designation.message}
                    </p>
                    <div className="error-icon">!</div>
                  </div>
                )}
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
                          className="inpt_tag"
                          disabled={!isEditing}
                          value={
                            CurEmp.quarter[CurEmp.quarter.length - 1]
                              .scoreOfEvaluation.sc1
                          }
                          onChange={(e) =>
                            setCurEmp({
                              ...CurEmp,
                              quarter: [
                                ...CurEmp.quarter.slice(
                                  0,
                                  CurEmp.quarter.length - 1
                                ),
                                {
                                  ...CurEmp.quarter[CurEmp.quarter.length - 1],
                                  scoreOfEvaluation: {
                                    ...CurEmp.quarter[CurEmp.quarter.length - 1]
                                      ?.scoreOfEvaluation,
                                    sc1: e.target.value,
                                  },
                                },
                              ],
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        Possess Conceptual Ability. Analyzes problem effectively
                        & finds creative solution to problems
                      </td>
                      <td>
                        <input
                          type="number"
                          name="sc2"
                          min="0"
                          max="10"
                          value={
                            CurEmp.quarter[CurEmp.quarter.length - 1]
                              .scoreOfEvaluation.sc2
                          }
                          onChange={(e) =>
                            setCurEmp({
                              ...CurEmp,
                              quarter: [
                                ...CurEmp.quarter.slice(
                                  0,
                                  CurEmp.quarter.length - 1
                                ),
                                {
                                  ...CurEmp.quarter[CurEmp.quarter.length - 1],
                                  scoreOfEvaluation: {
                                    ...CurEmp.quarter[CurEmp.quarter.length - 1]
                                      ?.scoreOfEvaluation,
                                    sc2: e.target.value,
                                  },
                                },
                              ],
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
                        Shows interest in work, learns quickly & Takes
                        initiative
                      </td>
                      <td>
                        <input
                          type="number"
                          name="sc3"
                          min="0"
                          max="10"
                          value={
                            CurEmp.quarter[CurEmp.quarter.length - 1]
                              .scoreOfEvaluation.sc3
                          }
                          onChange={(e) =>
                            setCurEmp({
                              ...CurEmp,
                              quarter: [
                                ...CurEmp.quarter.slice(
                                  0,
                                  CurEmp.quarter.length - 1
                                ),
                                {
                                  ...CurEmp.quarter[CurEmp.quarter.length - 1],
                                  scoreOfEvaluation: {
                                    ...CurEmp.quarter[CurEmp.quarter.length - 1]
                                      ?.scoreOfEvaluation,
                                    sc3: e.target.value,
                                  },
                                },
                              ],
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
                          value={
                            CurEmp.quarter[CurEmp.quarter.length - 1]
                              .scoreOfEvaluation.sc4
                          }
                          onChange={(e) =>
                            setCurEmp({
                              ...CurEmp,
                              quarter: [
                                ...CurEmp.quarter.slice(
                                  0,
                                  CurEmp.quarter.length - 1
                                ),
                                {
                                  ...CurEmp.quarter[CurEmp.quarter.length - 1],
                                  scoreOfEvaluation: {
                                    ...CurEmp.quarter[CurEmp.quarter.length - 1]
                                      ?.scoreOfEvaluation,
                                    sc4: e.target.value,
                                  },
                                },
                              ],
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
                          value={
                            CurEmp.quarter[CurEmp.quarter.length - 1]
                              .scoreOfEvaluation.sc5
                          }
                          onChange={(e) =>
                            setCurEmp({
                              ...CurEmp,
                              quarter: [
                                ...CurEmp.quarter.slice(
                                  0,
                                  CurEmp.quarter.length - 1
                                ),
                                {
                                  ...CurEmp.quarter[CurEmp.quarter.length - 1],
                                  scoreOfEvaluation: {
                                    ...CurEmp.quarter[CurEmp.quarter.length - 1]
                                      ?.scoreOfEvaluation,
                                    sc5: e.target.value,
                                  },
                                },
                              ],
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
                          value={
                            CurEmp.quarter[CurEmp.quarter.length - 1]
                              ?.scoreOfEvaluation?.sc6
                          }
                          onChange={(e) =>
                            setCurEmp({
                              ...CurEmp,
                              quarter: [
                                ...CurEmp.quarter.slice(
                                  0,
                                  CurEmp.quarter.length - 1
                                ),
                                {
                                  ...CurEmp.quarter[CurEmp.quarter.length - 1],
                                  scoreOfEvaluation: {
                                    ...CurEmp.quarter[CurEmp.quarter.length - 1]
                                      ?.scoreOfEvaluation,
                                    sc6: e.target.value,
                                  },
                                },
                              ],
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
                      <td>
                        {parseInt(
                          CurEmp.quarter[CurEmp.quarter.length - 1]
                            ?.scoreOfEvaluation?.totalScore
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h4>PART - II</h4>
              <div
                className={`Table_rows ${
                  errors.selfAppraisalScore ? "error" : ""
                }`}
              >
                <span className="spantype_score">Self Appraisal Score :</span>
                <input
                  type="number"
                  placeholder="Marks Out of 25"
                  min="0"
                  max="25"
                  // name="selfAppraisalScore"
                  value={
                    CurEmp.quarter[CurEmp.quarter.length - 1]?.scoreOfEvaluation
                      ?.selfAppraisalScore
                  }
                  {...register("selfAppraisalScore", {
                    required: "",
                    pattern: {
                      value: /^[\w\s]+$/,
                      message: "",
                    },
                    max: {
                      value: 25,
                      message: "",
                    },
                  })}
                  onChange={(e) =>
                    setCurEmp({
                      ...CurEmp,
                      quarter: [
                        ...CurEmp.quarter.slice(0, CurEmp.quarter.length - 1),
                        {
                          ...CurEmp.quarter[CurEmp.quarter.length - 1],
                          scoreOfEvaluation: {
                            ...CurEmp.quarter[CurEmp.quarter.length - 1]
                              ?.scoreOfEvaluation,
                            selfAppraisalScore: e.target.value,
                          },
                        },
                      ],
                    })
                  }
                  required
                  className="inpt_tag"
                  disabled={!isEditing}
                />

                {errors.selfAppraisalScore && (
                  <div className="error-container">
                    <p className="error-message">
                      {errors.selfAppraisalScore.message}
                    </p>
                    <div className="error-icon">!</div>
                  </div>
                )}
              </div>
              <h4>PART - III</h4>
              <div
                className={`Table_rows ${
                  errors.achievementBeyondScore ? "error" : ""
                }`}
              >
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
                  value={
                    CurEmp.quarter[CurEmp.quarter.length - 1]?.scoreOfEvaluation
                      ?.achievementBeyondScore
                  }
                  {...register("achievementBeyondScore", {
                    required: "This field is required",
                    pattern: {
                      value: /^[\w\s]+$/,
                      message: "Invalid input",
                    },
                    max: {
                      value: 15,
                      message: "Value must be less than or equal to 15",
                    },
                  })}
                  onChange={(e) =>
                    setCurEmp((CurEmp) => {
                      const lastQuarterIndex = CurEmp.quarter.length - 1;

                      const updatedQuarter = [
                        ...CurEmp.quarter.slice(0, lastQuarterIndex),
                        {
                          ...CurEmp.quarter[lastQuarterIndex],
                          scoreOfEvaluation: {
                            ...CurEmp.quarter[lastQuarterIndex]
                              ?.scoreOfEvaluation,
                            achievementBeyondScore: e.target.value,
                          },
                        },
                      ];

                      return {
                        ...CurEmp,
                        quarter: updatedQuarter,
                      };
                    })
                  }
                  required
                  className="inpt_tag"
                  disabled={!isEditing}
                />
                {errors.achievementBeyondScore && (
                  <div className="error-container">
                    <p className="error-message">
                      {errors.achievementBeyondScore.message}
                    </p>
                    <div className="error-icon">!</div>
                  </div>
                )}
              </div>
              <p>
                TOTAL MARKS OUT OF 40 :{" "}
                {parseInt(
                  CurEmp.quarter[CurEmp.quarter.length - 1]?.scoreOfEvaluation
                    ?.achievementBeyondScore
                ) +
                  parseInt(
                    CurEmp.quarter[CurEmp.quarter.length - 1]?.scoreOfEvaluation
                      ?.selfAppraisalScore
                  )}
              </p>
              <p>
                TOTAL MARKS OUT OF 100 :{" "}
                {parseInt(
                  CurEmp.quarter[CurEmp.quarter.length - 1]?.scoreOfEvaluation
                    ?.achievementBeyondScore
                ) +
                  parseInt(
                    CurEmp.quarter[CurEmp.quarter.length - 1]?.scoreOfEvaluation
                      ?.selfAppraisalScore
                  ) +
                  parseInt(
                    CurEmp.quarter[CurEmp.quarter.length - 1]?.scoreOfEvaluation
                      ?.totalScore
                  )}
              </p>
              <h3>
                Overall performance of the Employee "{Remark}"
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

            <div className="btn_class_Grid">
              <Grid CurEmp={CurEmp} setCurEmp={setCurEmp} />
              {isEditing ? (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  type="submit"
                  className="submitbtn_Eval"
                >
                  submit
                </button>
              ) : (
                <div className="Edit_lock_Submit">
                  <button
                    onClick={(e) => {
                      setIsEditing(!isEditing);
                    }}
                    type="submit"
                    className="submitbtn_Eval"
                  >
                    Edit
                  </button>
                  <button type="submit" className="submitbtn_Eval">
                    Lock & Submit
                  </button>
                </div>
              )}
            </div>
          </form>
          <SelfAppraisalData
            isVisible={isVisible}
            setisVisible={setisVisible}
            final_score = {final_score}
          />
        </div>
      ) : (
        "loading the form"
      )}
    </>
  );
};

export default Evaluation_form;
