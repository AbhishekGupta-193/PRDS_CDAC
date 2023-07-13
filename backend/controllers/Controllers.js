import User from "../models/user.js";
import nodemailer from "nodemailer";
import htmlTemplate from ".././EmailTemplate.js";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      if (password === user.password) {
        if (user.Role.HR === true) {
          res.send({
            status: 200,
            message: "HR Login",
            empId: user.empId,
          });
        } else {
          res.send({
            status: 200,
            message: "Emp Login",
            empId: user.empId,
          });
        }
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
};

export const updateRequest = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      user.request = !user.request;
      await user.save();
      res.json(user);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export const getRequests = async (req, res) => {
  try {
    const users = await User.find({ request: true });
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const submitSelfAppraisel = async (req, res) => {
  const { empId, quarterId, selfAppraisalData } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { empId: empId, "quarter._id": quarterId },
      {
        $set: {
          "quarter.$.selfAppFormData1": selfAppraisalData.selfAppFormData1,
          "quarter.$.selfAppFormData2": selfAppraisalData.selfAppFormData2,
          "quarter.$.dateOfFillingSelfAppraisalForm":
            selfAppraisalData.dateOfFillingSelfAppraisalForm,
          "quarter.$.SelfAppraisal_status": true,
        },
      },
      { new: true }
    );

    if (user) {
      res.send({ msg: "Self appraisal submitted successfully", user });
    } else {
      res.status(404).send({ msg: "User or Quarter not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export const submitAparForm = async (req, res) => {
  try {
    const filter = { empId: req.body.empId };
    const updatedUser = await User.findOneAndUpdate(
      filter,
      { $push: { quarter: req.body.user } },
      { new: true }
    );
    const updatedReporting = await User.findOneAndUpdate(
      { email: req.body.user.groupHead_email },
      { $set: { "Role.Reporting_Officer": true } },
      { new: true }
    );

    const updatedReportingSLA = await User.findOneAndUpdate(
      { email: req.body.user.SLA_email },
      { $set: { "Role.SLA": true } },
      { new: true }
    );

    res.send({ msg: "user updated ", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const submitEvalutaionForm = async (req, res) => {
  const { empId } = req.body;
  try {
    req.body.quarter[req.body.quarter.length-1].Evalutation_status = true; 


    const user = await User.findOneAndUpdate({ empId: empId }, req.body, {
      new: true,
    });

    if (user) {
      res.send({ msg: "Successfully registered", user });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};
export const submitEvalutaionFormSLA = async (req, res) => {
  const { empId } = req.body;
  try {
    req.body.quarter[req.body.quarter.length-1].Evalutation_status_bySLA = true; 
  console.log(req.body);


    const user = await User.findOneAndUpdate({ empId: empId }, req.body, {
      new: true,
    });

    if (user) {
      res.send({ msg: "Successfully registered", user });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};


export const sendMail = (req, res) => {
  const { email, userName, dateOfBirth, empId, dateOfEntryInCdac, quarter } =
    req.body;
  const formattedTemplate = htmlTemplate
    .replace("{userName}", userName)
    .replace("{userName1}", userName)
    .replace(
      "{appraiselPeriodTo}",
      quarter[quarter.length - 1].appraiselPeriodTo.split("T")[0]
    )
    .replace(
      "{appraiselPeriodFrom}",
      quarter[quarter.length - 1].appraiselPeriodFrom.split("T")[0]
    )
    .replace(
      "{dateofSubmission}",
      quarter[quarter.length - 1].dateofSubmission.split("T")[0]
    )
    .replace("{empId}", empId)
    .replace("{dateOfBirth}", dateOfBirth.split("T")[0])
    .replace("{designation}", quarter[quarter.length - 1].designation)
    .replace("{presentPay}", quarter[quarter.length - 1].presentPay)
    .replace("{dateOfEntryInCdac}", dateOfEntryInCdac)
    .replace(
      "{absenceOtherThanLeave}",
      quarter[quarter.length - 1].absenceOtherThanLeave
    )
    .replace("{leaveAvailed}", quarter[quarter.length - 1].leaveAvailed);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "akashchauhan72520@gmail.com",
      pass: "mmdaudzbxrotscir",
    },
  });
  // Define the email details
  const mailOptions = {
    from: '"PRDS Team CDAC"<akashchauhan72520@gmail.com>',
    to: email,
    subject: "Reminder!",
    html: formattedTemplate,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent successfully:", info.response);
      res.send("Email sent successfully");
    }
  });
};
