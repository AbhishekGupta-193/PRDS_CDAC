
import React, { useEffect, useState, useContext } from "react";
import "./APAR_form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../StateContext";
import { useForm } from "react-hook-form";


function APAR_form() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { curuser, setcuruser } = useGlobalContext();
  const { isSubmitted, setisSubmitted } = useGlobalContext();
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

  const [user, setuser] = useState({
    appraiselPeriodFrom: null,
    appraiselPeriodTo: null,
    userName: null,
    empId: null,
    dateOBirth: null,
    designation: null,
    presentpay: null,
    dateOfEntryInCdac: null,
    absenceOtherThanLeave: null,
    leaveAvailed: null,
    dateOfFillingAparForm: null,
    group: null,
    APAP_status: false,
  });
  const { alluser, setalluser } = useGlobalContext();


  const handleSubmit1 = async (e) => {
    e.preventDefault();

    // console.log({ user });

    try {
      const { data } = await axios.post(
        "http://localhost:5000/submitAparForm",
        user
      );
      setcuruser(data.user);
      setisSubmitted(true);
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

        <div className="Table_rows">
          <span className="spantype">Report for the Period :</span>
          <div className="inpt_periodbox">
          <div className={`from_apar ${errors.appraiselPeriodFrom ? "error" : ""}`}>
            <input
              type="date"
              placeholder="FROM : DD / MM / YYYY"
              name="Aparfrom"
              value={user.appraiselPeriodFrom}
              onChange={(e) =>
                setuser({ ...user, appraiselPeriodFrom: e.target.value })
              }
              disabled={!isEditing}
              className="inpt_period"
              {...register("appraiselPeriodFrom", {
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
            ></input>
           {errors.appraiselPeriodFrom && (
            <div className="error-container">
              <p className="error-message">{errors.appraiselPeriodFrom.message}</p>
              <div className="error-icon">!</div>
            </div>
          )}
          </div>
          <div className={`to_apar ${errors.appraiselPeriodTo ? "error" : ""}`}>
            <input
              type="date"
              placeholder="TO : DD / MM / YYYY"
              name="Aparupto"
              value={user.appraiselPeriodTo}
              onChange={(e) =>
                setuser({ ...user, appraiselPeriodTo: e.target.value })
              }
              disabled={!isEditing}
              className="inpt_period"
              {...register("appraiselPeriodTo", {
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
            ></input>
            {errors.appraiselPeriodTo && (
            <div className="error-container">
              <p className="error-message">{errors.appraiselPeriodTo.message}</p>
              <div className="error-icon">!</div>
            </div>
          )}
          </div>
          </div>
        </div>
        <div className="personal_deatils">
          <div className={`Table_rows ${errors.userName ? "error" : ""}`}>

            <span className="spantype">Name :</span>
            <input
              type="text"
              placeholder="Name"
              name="username"

              value={user.userName}
              onChange={(e) => setuser({ ...user, userName: e.target.value })}
              className="inpt"
              disabled={!isEditing}

              {...register("userName", {
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
            {errors.userName && (
            <div className="error-container">
              <p className="error-message">{errors.userName.message}</p>
              <div className="error-icon">!</div>
            </div>
          )}
          </div>
          <div className={`Table_rows ${errors.empId ? "error" : ""}`}>

            <span className="spantype">Employee Id :</span>
            <input
              id="empid_apar"
              type="text"
              placeholder="Employee Id"

              name="EmployeeID"
              value={user.empId}
              onChange={(e) => setuser({ ...user, empId: e.target.value })}
              className="inpt"
              disabled={!isEditing}

              {...register("empId", {
                required: "",
                pattern: {
                  value: /^\d+$/,
                  message: "",
                },
                maxLength: {
                  value: 20,
                  message: "",
                },
              })}
            ></input>
            {errors.empId && (
            <div className="error-container">
              <p className="error-message">{errors.empId.message}</p>
              <div className="error-icon">!</div>
            </div>
          )}

          </div>
          <div className={`Table_rows ${errors.dateOBirth ? "error" : ""}`}>

            <span className="spantype">Date of Birth :</span>

            <input
              type="date"
              placeholder="Date of birth"
              name="dob"
              value={user.dateOBirth}
              onChange={(e) => setuser({ ...user, dateOBirth: e.target.value })}
              className="inpt"
              disabled={!isEditing}

              {...register("dateOBirth", {
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
            ></input>
            {errors.dateOBirth && (
            <div className="error-container">
              <p className="error-message">{errors.dateOBirth.message}</p>
              <div className="error-icon">!</div>
            </div>
          )}

          </div>
          <div className={`Table_rows ${errors.designation ? "error" : ""}`}>

            <span className="spantype">Designation :</span>

            <input
              id="des_apar"
              type="text"
              placeholder="Designation"
              name="designation"
              value={user.designation}
              onChange={(e) =>
                setuser({ ...user, designation: e.target.value })
              }
              className="inpt"
              disabled={!isEditing}

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
              <p className="error-message">{errors.designation.message}</p>
              <div className="error-icon">!</div>
            </div>
          )}

          </div>
          <div className={`Table_rows ${errors.presentpay ? "error" : ""}`}>

            <span className="spantype">Present Pay :</span>

            <input
              type="text"
              placeholder="Present Pay"
              name="pay"
              value={user.presentpay}
              onChange={(e) => setuser({ ...user, presentpay: e.target.value })}
              className="inpt"
              disabled={!isEditing}

              {...register("presentpay", {
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
            ></input>
            {errors.presentpay && (
            <div className="error-container">
              <p className="error-message">{errors.presentpay.message}</p>
              <div className="error-icon">!</div>
            </div>
          )}

          </div>
          <div className={`Table_rows ${errors.group ? "error" : ""}`}>

            <span className="spantype">section/Group :</span>
            <input
              type="text"
              placeholder="Section/Group"
              name="grp"
              value={user.group}
              onChange={(e) => setuser({ ...user, group: e.target.value })}
              className="inpt"
              disabled={!isEditing}
              {...register("group", {
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
            {errors.group && (
            <div className="error-container">
              <p className="error-message">{errors.group.message}</p>
              <div className="error-icon">!</div>
            </div>
          )}
          </div>
          <div className={`Table_rows ${errors.dateOfEntryInCdac ? "error" : ""}`}>

            <span className="spantype">Date of entry in CDAC :</span>
            <input
              type="date"
              placeholder=" DD / MM / YYYY"
              name="entrydate"
              value={user.dateOfEntryInCdac}
              onChange={(e) =>
                setuser({ ...user, dateOfEntryInCdac: e.target.value })
              }
              className="inpt"
              disabled={!isEditing}
              {...register("dateOfEntryInCdac", {
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
            ></input>
            {errors.dateOfEntryInCdac && (
            <div className="error-container">
              <p className="error-message">{errors.dateOfEntryInCdac.message}</p>
              <div className="error-icon">!</div>
            </div>
          )}
          </div>
          <div className={`Table_rows ${errors.dateOfFillingAparForm ? "error" : ""}`}>

            <span className="spantype">
              Date of entry to the current designation :
            </span>
            <input
              type="date"
              placeholder="Date of entry to the current designation"
              name="Apardate"
              value={user.dateOfFillingAparForm}
              onChange={(e) =>
                setuser({ ...user, dateOfFillingAparForm: e.target.value })
              }
              className="inpt"
              disabled={!isEditing}
              {...register("dateOfFillingAparForm", {
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
            ></input>
            {errors.dateOfFillingAparForm && (
            <div className="error-container">
              <p className="error-message">{errors.dateOfFillingAparForm.message}</p>
              <div className="error-icon">!</div>
            </div>
          )}
          </div>
          <div className={`Table_rows ${errors.leaveAvailed ? "error" : ""}`}>

            <span className="spantype">Leave availed :</span>
            <input
              type="text"
              placeholder="Leave availed"
              name="leave"
              value={user.leaveAvailed}
              onChange={(e) =>
                setuser({ ...user, leaveAvailed: e.target.value })
              }
              className="inpt"
              disabled={!isEditing}
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
            ></input>
            {errors.leaveAvailed && (
            <div className="error-container">
              <p className="error-message">{errors.leaveAvailed.message}</p>
              <div className="error-icon">!</div>
            </div>
          )}
          </div>
          <div className={`Table_rows ${errors.absenceOtherThanLeave ? "error" : ""}`}>
            
            <span className="spantype">
              Absence from duty other then leave :
            </span>
            <input
              type="text"
              placeholder="Absence from duty other then leave"
              name="otherleave"
              value={user.absenceOtherThanLeave}
              onChange={(e) =>
                setuser({ ...user, absenceOtherThanLeave: e.target.value })
              }
              className="inpt"
              disabled={!isEditing}
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
            ></input>
            {errors.absenceOtherThanLeave && (
            <div className="error-container">
              <p className="error-message">{errors.absenceOtherThanLeave.message}</p>
              <div className="error-icon">!</div>
            </div>
          )}
          </div>
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