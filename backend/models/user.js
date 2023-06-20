import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    userName: String,
    empId: String,
    dateOfBirth: Date,
    designation: String,
    presentPay: String,
    group: String,
    groupHead: String,
    dateOfEntryInCdac: Date,
    dateOfEntryToCurrentDesignation: Date,
    leaveAvailed: String,
    absenceOtherThanLeave: String,
    appraiselPeriodFrom: Date,
    appraiselPeriodTo: Date,
    projectName: String,
    APAR_status: Boolean,
    SelfAppraisal_status : Boolean,
    Evalutation_status : Boolean,
    Role:{
        HR:Boolean,
        Reporting_Officer:Boolean
    },
    selfAppFormData1: [
      {
        jobAssigned: String,
        serialNumber: String,
        achievement: String
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
    scoreOfEvaluation: {
      sc1: String,
      sc2: String,
      sc3: String,
      sc4: String,
      sc5: String,
      sc6: String,
      selfAppraisalScore: String,
      achievementBeyondScore: String,
      totalScore: String
    },
    additionalComments: String
});

export default mongoose.model("User", userSchema);
