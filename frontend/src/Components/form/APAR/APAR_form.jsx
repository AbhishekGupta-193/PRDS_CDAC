import React, { useEffect, useState, useContext } from "react";
import "./APAR_form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../StateContext";
// import { useForm } from "react-hook-form";

import validator from "validator";

function APAR_form() {
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { curuser, setcuruser } = useGlobalContext();
  const { isSubmitted, setisSubmitted } = useGlobalContext();
  console.log(isSubmitted);

  // const { register, handleSubmit, formState: { errors } } = useForm();
  // const onSubmit = (data) => {
  //   console.log(data);
  // }
  const [user, setuser] = useState({
    appraiselPeriodFrom: "",
    appraiselPeriodTo: "",
    userName: "",
    empId: "",
    dateOBirth: "",
    designation: "",
    presentpay: "",
    dateOfEntryInCdac: "",
    absenceOtherThanLeave: "",
    leaveAvailed: "",
    dateOfFillingAparForm: "",
    group: "",
    APAP_status: false,
  });
  const { alluser, setalluser } = useGlobalContext();

  const validateForm = () => {
    const errors = {};
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const alphabetRegex = /^[A-Za-z]+$/;

    if (!user.appraiselPeriodFrom) {
      errors.appraiselPeriodFrom = "*This is required";
    } else if (!dateRegex.test(user.appraiselPeriodFrom)) {
      errors.appraiselPeriodFrom = "*Numeric input is required";
    }

    // ----------------------->
    if (!user.appraiselPeriodTo) {
      errors.appraiselPeriodTo = "*This is required";
    } else if (!dateRegex.test(user.appraiselPeriodTo)) {
      errors.appraiselPeriodTo = "*Numeric input is required";
    }
    // ----------------------->
    if (validator.isEmpty(user.userName)) {
      errors.userName = "*This is required";
    } else if (!alphabetRegex.test(user.userName)) {
      errors.userName = "*Alphabetic input is required";
    } else if (!validator.isLength(user.userName, { min: 2, max: 20 })) {
      errors.userName = "*Name can't exceed 20 characters";
    }

    // ----------------------->

    if (validator.isEmpty(user.empId)) {
      errors.empId = "*This is required";
    } else if (!dateRegex.test(user.empId)) {
      errors.empId = "*Numeric input is required";
    }

    // ----------------------->
    if (!user.dateOBirth) {
      errors.dateOBirth = "*This is required";
    } else if (!dateRegex.test(user.dateOBirth)) {
      errors.dateOBirth = "*Numeric input is required";
    }

    // // ----------------------->
    if (validator.isEmpty(user.designation)) {
      errors.designation = "*This is required";
    } else if (!alphabetRegex.test(user.designation)) {
      errors.designation = "*Alphabetic input is required";
    } else if (!validator.isLength(user.designation, { min: 3, max: 20 })) {
      errors.designation = "*Designation can't exceed 20 characters";
    }

    // ----------------------->
    if (user.presentpay === "") {
      errors.presentpay = "*This is required";
    }
    if (!validator.isInt(user.presentpay, { min: 0, max: 250000 })) {
      errors.presentpay = "*Numeric input is required";
    }
    // ----------------------->
    if (validator.isEmpty(user.group)) {
      errors.group = "*This is required";
    }
    if (!validator.isLength(user.group, { min: 3, max: 20 })) {
      errors.group = "*length between 3 and 20";
    }
    if (!alphabetRegex.test(user.group)) {
      errors.group = "*Alphabetic input is required";
    }
    // ----------------------->
    if (!user.dateOfEntryInCdac) {
      errors.dateOfEntryInCdac = "*This is required";
    } else if (!dateRegex.test(user.dateOfEntryInCdac)) {
      errors.dateOfEntryInCdac = "*Numeric input is required";
    }
    // ----------------------->
    if (!user.dateOfFillingAparForm) {
      errors.dateOfFillingAparForm = "*This is required";
    } else if (!dateRegex.test(user.dateOfFillingAparForm)) {
      errors.dateOfFillingAparForm = "*Numeric input is required";
    }
    // ----------------------->
    if (validator.isEmpty(user.leaveAvailed)) {
      errors.leaveAvailed = "*This is required";
    }
    if (!validator.isLength(user.group, { min: 3, max: 100 })) {
      errors.leaveAvailed = "*length between 3 and 100";
    }
    if (!alphabetRegex.test(user.leaveAvailed)) {
      errors.leaveAvailed = "*Alphabetic input is required";
    }
    // ----------------------->
    if (validator.isEmpty(user.absenceOtherThanLeave)) {
      errors.absenceOtherThanLeave = "*This is required";
    }
    if (!validator.isLength(user.group, { min: 3, max: 100 })) {
      errors.absenceOtherThanLeave = "*length between 3 and 100";
    }
    if (!alphabetRegex.test(user.absenceOtherThanLeave)) {
      errors.absenceOtherThanLeave = "*Alphabetic input is required";
    }

    return errors;
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    console.log({ user });

    try {
      const { data } = await axios.post(
        "http://localhost:5000/submitAparForm",
        user
      );
      setcuruser(data.user);
      console.log(isSubmitted);
      setisSubmitted(true);
      console.log(isSubmitted);
      navigate("/main2/HR");
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <>
      <form className="container_apar">
        <div className="head">
          <h3>APAR Management : Employee details</h3>
        </div>

        <div className="period">
          <span className="reporting_title">Report for the Period :</span>

          <div className="from_apar">
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
            ></input>
            {formErrors.appraiselPeriodFrom && (
              <span className="error_apar1">
                {formErrors.appraiselPeriodFrom}
              </span>
            )}
          </div>
          <div className="to_apar">
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
            ></input>
            {formErrors.appraiselPeriodTo && (
              <span className="error_apar2">
                {formErrors.appraiselPeriodTo}
              </span>
            )}
          </div>
        </div>
        <div className="personal_deatils">
          <div className="Table_rows">
            <span className="spantype">Name :</span>
            <input
              type="text"
              placeholder="Name"
              name="username"
              // {...register("userName",{required:true})}

              value={user.userName}
              onChange={(e) => setuser({ ...user, userName: e.target.value })}
              className="inpt"
              disabled={!isEditing}
            ></input>
            {formErrors.userName && (
              <span className="error">{formErrors.userName}</span>
            )}
          </div>
          <div className="Table_rows">
            <span className="spantype">Employee Id :</span>
            <input
              id="empid_apar"
              type="text"
              placeholder="Employee Id"
              // register={{...register("empid_apar")}}

              name="EmployeeID"
              value={user.empId}
              onChange={(e) => setuser({ ...user, empId: e.target.value })}
              className="inpt"
              disabled={!isEditing}
            ></input>
            {formErrors.empId && (
              <span className="error">{formErrors.empId}</span>
            )}
          </div>
          <div className="Table_rows">
            <span className="spantype">Date of Birth :</span>

            <input
              type="date"
              placeholder="Date of birth"
              name="dob"
              value={user.dateOBirth}
              onChange={(e) => setuser({ ...user, dateOBirth: e.target.value })}
              className="inpt"
              disabled={!isEditing}
            ></input>
            {formErrors.dateOBirth && (
              <span className="error">{formErrors.dateOBirth}</span>
            )}
          </div>
          <div className="Table_rows">
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
            ></input>
            {formErrors.designation && (
              <span className="error">{formErrors.designation}</span>
            )}
          </div>
          <div className="Table_rows">
            <span className="spantype">Present Pay :</span>

            <input
              type="text"
              placeholder="Present Pay"
              name="pay"
              value={user.presentpay}
              onChange={(e) => setuser({ ...user, presentpay: e.target.value })}
              className="inpt"
              disabled={!isEditing}
            ></input>
            {formErrors.presentpay && (
              <span className="error">{formErrors.presentpay}</span>
            )}
          </div>
          <div className="Table_rows">
            <span className="spantype">section/Group :</span>
            <input
              type="text"
              placeholder="Section/Group"
              name="grp"
              value={user.group}
              onChange={(e) => setuser({ ...user, group: e.target.value })}
              className="inpt"
              disabled={!isEditing}
            ></input>
            {formErrors.group && (
              <span className="error">{formErrors.group}</span>
            )}
          </div>
          <div className="Table_rows">
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
            ></input>
            {formErrors.dateOfEntryInCdac && (
              <span className="error">{formErrors.dateOfEntryInCdac}</span>
            )}
          </div>
          <div className="Table_rows">
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
            ></input>
            {formErrors.dateOfFillingAparForm && (
              <span className="error">{formErrors.dateOfFillingAparForm}</span>
            )}
          </div>
          <div className="Table_rows">
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
            ></input>
            {formErrors.leaveAvailed && (
              <span className="error">{formErrors.leaveAvailed}</span>
            )}
          </div>
          <div className="Table_rows">
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
            ></input>
            {formErrors.absenceOtherThanLeave && (
              <span className="error">{formErrors.absenceOtherThanLeave}</span>
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
                onClick={handleSubmit1}
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
