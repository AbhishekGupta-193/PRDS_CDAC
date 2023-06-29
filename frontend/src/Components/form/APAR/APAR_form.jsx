import React, { useEffect, useState, useContext } from "react";
import "./APAR_form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../StateContext.js";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

function APAR_form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const CurrentUser = location.state;
  // console.log(CurrentUser)
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(true);
  const { curuser, setcuruser } = useGlobalContext();
  const { isSubmitted } = useGlobalContext();
  console.log(isSubmitted);

  const getData = async () => {
    try {
      setcuruser(JSON.parse(localStorage.getItem("curuser")));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(CurrentUser);
  const [user, setuser] = useState({
    appraiselPeriodFrom: null,
    appraiselPeriodTo: null,
    absenceOtherThanLeave: null,
    leaveAvailed: null,
    APAP_status: false,
    dateofIssueofAPAR: null,
    dateofSubmission: null,
    dateofReviewbyRPO: null,
    designation: null,
    presentPay: null,

  });

  const handleSubmit1 = async (e) => {
    CurrentUser.quarter[CurrentUser.quarter.length - 1].absenceOtherThanLeave =
      user.absenceOtherThanLeave;
    CurrentUser.quarter[CurrentUser.quarter.length - 1].leaveAvailed =
      user.leaveAvailed;
    CurrentUser.quarter[CurrentUser.quarter.length - 1].APAP_status = true;
    CurrentUser.quarter[CurrentUser.quarter.length - 1].dateofIssueofAPAR =
      user.dateofIssueofAPAR;
    CurrentUser.quarter[CurrentUser.quarter.length - 1].dateofSubmission =
      user.dateofSubmission;
    CurrentUser.quarter[CurrentUser.quarter.length - 1].dateofReviewbyRPO =
      user.dateofReviewbyRPO;

    try {
      console.log("a=hamaea cueryse hye hai", CurrentUser, " aur ye hai normal user", user);
      const { data } = await axios.post("http://localhost:5000/submitAparForm", CurrentUser);
      // await axios.post("http://localhost:5000/send-email", CurrentUser);
      setcuruser(data.user);
      navigate("/main2/HR");
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };
  const handleFormSubmit = handleSubmit(handleSubmit1);

  return (
    <>
      <form className="container_apar" onSubmit={handleFormSubmit}>
        <div className="head">
          <h3>APAR Management : Employee details</h3>
        </div>

        <div className="Table_rows_APAR">

          <span className="spantype">Report for the Period :</span>
          <div className="inpt_periodbox">
            <div
              className={`from_apar ${errors.appraiselPeriodFrom ? "error" : ""
                }`}
            >
              <input
                type="date"
                placeholder="FROM : DD / MM / YYYY"
                name="Aparfrom"
                value={user.appraiselPeriodFrom}
                {...register("appraiselPeriodFrom", {
                  required: "",
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: "",
                  },
                  validate: {
                    notExceedCurrentDate: (value) => {
                      const fromDate = new Date(user.appraiselPeriodFrom);
                      const toDate = new Date(value);

                      if (toDate < fromDate) {
                        return "";
                      }

                      const selectedDate = new Date(value);
                      const currentDate = new Date();

                      if (selectedDate > currentDate) {
                        return "";
                      }

                      return true;
                    },
                  },
                })}
                onChange={(e) =>
                  setuser({ ...user, appraiselPeriodFrom: e.target.value })
                }
                disabled={!isEditing}
                className="inpt_period"
              ></input>
              {errors.appraiselPeriodFrom && (
                <div className="error-container">
                  <p className="error-message">
                    {errors.appraiselPeriodFrom.message}
                  </p>
                  <div className="error-icon">!</div>
                </div>
              )}
            </div>
            <div
              className={`to_apar ${errors.appraiselPeriodTo ? "error" : ""}`}
            >
              <input
                type="date"
                placeholder="TO : DD / MM / YYYY"
                name="Aparupto"
                value={user.appraiselPeriodTo}
                {...register("appraiselPeriodTo", {
                  required: "",
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: "",
                  },
                  validate: {
                    notExceedCurrentDate: (value) => {
                      const fromDate = new Date(user.appraiselPeriodTo);
                      const toDate = new Date(value);

                      if (toDate < fromDate) {
                        return "";
                      }

                      const selectedDate = new Date(value);
                      const currentDate = new Date();

                      if (selectedDate > currentDate) {
                        return "";
                      }

                      return true;
                    },
                  },
                })}
                onChange={(e) =>
                  setuser({ ...user, appraiselPeriodTo: e.target.value })
                }
                disabled={!isEditing}
                className="inpt_period"
              ></input>
              {errors.appraiselPeriodTo && (
                <div className="error-container">
                  <p className="error-message">
                    {errors.appraiselPeriodTo.message}
                  </p>
                  <div className="error-icon">!</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="personal_deatils">
          <div className={`Table_rows_APAR ${errors.userName ? "error" : ""}`}>
            <div className="Table_rows_APAR-1">
              <span className="spantype">Name :</span>
              <input
                type="text"
                placeholder="Name"
                name="username"
                value={CurrentUser.userName}
                className="inpt"
                disabled={true}
              ></input>
            </div>
          </div>

          <div className={`Table_rows_APAR ${errors.empId ? "error" : ""}`}>
            <div className="Table_rows_APAR-1">
              <span className="spantype">Employee Id :</span>
              <input
                id="empid_apar"
                type="text"
                placeholder="Employee Id"
                name="EmployeeID"
                value={CurrentUser.empId}
                className="inpt"
                disabled={true}

              ></input>
            </div>
          </div>
          <div
            className={`Table_rows_APAR ${errors.dateOBirth ? "error" : ""}`}
          >
            <div className="Table_rows_APAR-1">
              <span className="spantype">Date of Birth :</span>
              <input
                type="text"
                placeholder="Date of birth"
                name="dob"
                value={new Date(CurrentUser.dateOfBirth).toLocaleDateString()}
                className="inpt"
                disabled={true}
              ></input>
            </div>
          </div>
          <div
            className={`Table_rows_APAR ${errors.designation ? "error" : ""}`}
          >
            <div className="Table_rows_APAR-1">
              <span className="spantype">Designation :</span>

              <input
                id="des_apar"
                type="text"
                placeholder="Designation"
                name="designation"
                value={CurrentUser.quarter[CurrentUser.quarter.length - 1].designation}
                // onChange={(e) =>
                //   setuser({ ...user, designation: e.target.value })
                // }
                className="inpt"
                disabled={!isEditing}
              ></input>
            </div>
          </div>
          <div className={`Table_rows_APAR ${errors.presentPay ? "error" : ""}`}>
            <div className="Table_rows_APAR-1">
              <span className="spantype">Present Pay :</span>
              <input
                type="text"
                placeholder="Present Pay"
                name="pay"
                value={
                  user.presentPay
                }
                {...register("presentPay", {
                  required: "",
                  pattern: {
                    value: /^[\w\s]+$/,
                    message: "",
                  },
                  maxLength: {
                    value: 20,
                    message: "",
                  },
                })}
                onChange={(e) => setuser({ ...user, presentPay: e.target.value })}
                className="inpt"
                disabled={!isEditing}
              ></input>
            </div>
            {errors.presentPay && (
              <div className="error-container">
                <p className="error-message">{errors.presentPay.message}</p>
                <div className="error-icon">!</div>
              </div>
            )}
          </div>
          <div className={`Table_rows_APAR ${errors.group ? "error" : ""}`}>
            <div className="Table_rows_APAR-1">
              <span className="spantype">section/Group :</span>
              <input
                type="text"
                placeholder="Section/Group"
                name="grp"
                value={CurrentUser.quarter[CurrentUser.quarter.length - 1].group}
                className="inpt"
                disabled={true}
              ></input>
            </div>
          </div>
          <div
            className={`Table_rows_APAR ${errors.dateOfEntryInCdac ? "error" : ""
              }`}
          >
            <div className="Table_rows_APAR-1">
              <span className="spantype">Date of entry in CDAC :</span>
              <input
                type="text"
                placeholder=" DD / MM / YYYY"
                name="entrydate"
                value={new Date(CurrentUser.dateOfEntryInCdac).toLocaleDateString()}
                className="inpt"
                disabled={true}
              ></input>
            </div>
          </div>
          <div
            className={`Table_rows_APAR ${errors.dateOfFillingAparForm ? "error" : ""
              }`}
          >
            <div className="Table_rows_APAR-1">
              <span className="spantype">
                Date of entry to the current designation :
              </span>
              <input
                type="text"
                placeholder="Date of entry to the current designation"
                name="Apardate"
                value={new Date(CurrentUser.quarter[CurrentUser.quarter.length - 1]
                  .dateOfEntryToCurrentDesignation).toLocaleDateString()}
                className="inpt"
                disabled={true}
              ></input>
            </div>
          </div>
          <div
            className={`Table_rows_APAR ${errors.leaveAvailed ? "error" : ""}`}
          >
            <div className="Table_rows_APAR-1">
              <span className="spantype">Leave availed :</span>
              <input
                type="text"
                placeholder="Leave availed"
                name="leave"
                value={user.leaveAvailed}
                {...register("leaveAvailed", {
                  required: "",
                  pattern: {
                    value: /^\d+$/,
                    message: "",
                  },
                  maxLength: {
                    value: 3,
                    message: "",
                  },
                })}
                onChange={(e) =>
                  setuser({ ...user, leaveAvailed: e.target.value })
                }
                className="inpt"
                disabled={!isEditing}

              ></input>
            </div>
            {errors.leaveAvailed && (
              <div className="error-container">
                <p className="error-message">{errors.leaveAvailed.message}</p>
                <div className="error-icon">!</div>
              </div>
            )}
          </div>
          <div
            className={`Table_rows_APAR ${errors.absenceOtherThanLeave ? "error" : ""
              }`}
          >
            <div className="Table_rows_APAR-1">
              <span className="spantype">
                Absence from duty other then leave :
              </span>
              <input
                type="text"
                placeholder="Absence from duty other then leave"
                name="otherleave"
                value={user.absenceOtherThanLeave}
                {...register("absenceOtherThanLeave", {
                  required: "",
                  pattern: {
                    value: /^\d+$/,
                    message: "",
                  },
                  maxLength: {
                    value: 3,
                    message: "",
                  },
                })}
                onChange={(e) =>
                  setuser({ ...user, absenceOtherThanLeave: e.target.value })
                }
                className="inpt"
                disabled={!isEditing}
              ></input>
            </div>
            {errors.absenceOtherThanLeave && (
              <div className="error-container">
                <p className="error-message">
                  {errors.absenceOtherThanLeave.message}
                </p>
                <div className="error-icon">!</div>
              </div>
            )}
          </div>
        </div>
        <div
          className={`Table_rows_APAR ${errors.dateofIssueofAPAR ? "error" : ""
            }`}
        >
          <div className="Table_rows_APAR-1">
            <span className="spantype">Date of Issue:</span>
            <input
              type="date"
              placeholder="Date of Issue"
              name="Apardate"
              value={user.dateofIssueofAPAR}
              {...register("dateofIssueofAPAR", {
                required: "",
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: "",
                },
                validate: {
                  notExceedCurrentDate: (value) => {
                    const selectedDate = new Date(value);
                    const currentDate = new Date();

                    if (selectedDate > currentDate) {
                      return "";
                    }

                    return true;
                  },
                },
              })}
              onChange={(e) =>
                setuser({ ...user, dateofIssueofAPAR: e.target.value })
              }
              className="inpt"
              disabled={!isEditing}

            ></input>
          </div>
          {errors.dateofIssueofAPAR && (
            <div className="error-container">
              <p className="error-message">
                {errors.dateofIssueofAPAR.message}
              </p>
              <div className="error-icon">!</div>
            </div>
          )}
        </div>
        <div
          className={`Table_rows_APAR ${errors.dateofSubmission ? "error" : ""
            }`}
        >
          <div className="Table_rows_APAR-1">
            <div className="Table_rows_APAR-1">
              <span className="spantype">Deadline for Submission:</span>
              <input
                type="date"
                placeholder="Deadline for submission"
                name="Apardate"
                value={user.dateofSubmission}
                {...register("dateofSubmission", {
                  required: "",
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: "",
                  },
                  validate: {
                    notExceedCurrentDate: (value) => {
                      const selectedDate = new Date(value);
                      const currentDate = new Date();

                      if (selectedDate < currentDate) {
                        return "LJHRGLAUGHA";
                      }

                      return true;
                    },
                  },
                })}
                onChange={(e) =>
                  setuser({ ...user, dateofSubmission: e.target.value })
                }
                className="inpt"
                disabled={!isEditing}

              ></input>
            </div>
          </div>
          {errors.dateofSubmission && (
            <div className="error-container">
              <p className="error-message">{errors.dateofSubmission.message}</p>
              <div className="error-icon">!</div>
            </div>
          )}
        </div>
        <div
          className={`Table_rows_APAR ${errors.dateofReviewbyRPO ? "error" : ""
            }`}
        >
          <div className="Table_rows_APAR-1">
            <span className="spantype">Date for review by FLA:</span>
            <input
              type="date"
              placeholder="Date for review by FlA"
              name="Apardate"
              value={user.dateofReviewbyRPO}
              {...register("dateofReviewbyRPO", {
                required: "",
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: "",
                },
                validate: {
                  notExceedCurrentDate: (value) => {
                    const selectedDate = new Date(value);
                    const currentDate = new Date();

                    if (selectedDate > currentDate) {
                      return "";
                    }

                    return true;
                  },
                },
              })}
              onChange={(e) =>
                setuser({ ...user, dateofReviewbyRPO: e.target.value })
              }
              className="inpt"
              disabled={!isEditing}

            ></input>
          </div>
          {errors.dateofReviewbyRPO && (
            <div className="error-container">
              <p className="error-message">
                {errors.dateofReviewbyRPO.message}
              </p>
              <div className="error-icon">!</div>
            </div>
          )}
        </div>
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
              // onClick={handleSubmit1}
              >
                Lock & Submit
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default APAR_form;