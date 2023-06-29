import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const quarterSchema = new mongoose.Schema({
 
  scoreOfEvaluation: {
    sc1: Number,
    sc2: Number,
    sc3: Number,
    sc4: Number,
    sc5: Number,
    sc6: Number,
    selfAppraisalScore: Number,
    achievementBeyondScore: Number,
    totalScore: Number
  },
  designation: String,
  presentPay: String,
  group: String,
  groupHead: String,
  groupHead_email:String,
  dateOfEntryToCurrentDesignation: Date,
  leaveAvailed: Number,
  absenceOtherThanLeave: Number,
  appraiselPeriodFrom: Date,
  appraiselPeriodTo: Date,
  projectName: String,
  APAR_status: Boolean,
  SelfAppraisal_status: Boolean,
  Evalutation_status: Boolean,
  dateofIssueofAPAR: Date,
  dateofSubmission: Date,
  dateofReviewbyRPO: Date,
  selfAppFormData1: [
    {
      jobAssigned: String,
      Corresponding_Achievement:String
    }
  ],
  selfAppFormData2: [
    {
      achievement: String,
      deliverables: String
    }
  ],
  dateOfFillingAparForm: Date,
  dateOfFillingSelfAppraisalForm: Date,
  dateOfFillingEvaluationForm: Date,
  additionalComments: String,
  employeeFinalRemark: String
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  userName: String,
  empId: Number,
  dateOfBirth: Date,
  dateOfEntryInCdac: Date,
  Role: {
    HR: Boolean,
    Reporting_Officer: Boolean
  },
  quarter: [quarterSchema]
});

export default mongoose.model("User", userSchema);
