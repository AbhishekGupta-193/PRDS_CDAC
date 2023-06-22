import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  userName: String,
  empId: Number,
  dateOfBirth: Date,
  designation: String,
  presentPay: String,
  group: String,
  groupHead: String,
  dateOfEntryInCdac: Date,
  dateOfEntryToCurrentDesignation: Date,
  leaveAvailed: Number,
  absenceOtherThanLeave: Number,
  appraiselPeriodFrom: Date,
  appraiselPeriodTo: Date,
  projectName: String,
  APAR_status: Boolean,
  SelfAppraisal_status: Boolean,
  Evalutation_status: Boolean,
  Role: {
    HR: Boolean,
    Reporting_Officer: Boolean,
  },
  selfAppFormData1: [
    {
      jobAssigned: String,
      serialNumber: String,
      achievement: String,
    },
  ],
  selfAppFormData2: [
    {
      achievement: String,
      deliverables: String,
    },
  ],
  dateOfFillingAparForm: Date,
  dateOfFillingSelfAppraisalForm: Date,
  dateOfFillingEvaluationForm: Date,
  scoreOfEvaluation: {
    sc1: Number,
    sc2: Number,
    sc3: Number,
    sc4: Number,
    sc5: Number,
    sc6: Number,
    selfAppraisalScore: Number,
    achievementBeyondScore: Number,
    totalScore: Number,
  },
  additionalComments: String
});

export default mongoose.model("User", userSchema);
