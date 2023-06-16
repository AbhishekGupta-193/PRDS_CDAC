import mongoose from "mongoose";
mongoose.set('strictQuery', false);

const userSchema = new mongoose.Schema({
    email: String,
    password: String,

    request: Boolean,
    filledByHr: Boolean,
    filledByEmployee: Boolean,

    username: String,
    EmployeeID: String,
    SelfAppraisalPeriod_from: Date,
    SelfAppraisalPeriod_to: Date,
    ProjectName: String,
    // EmailID: "",
    CurrentResponsiblities: String,
    JobAsssigned: String,
    SpecificAchievementByTheEmployee: String,
    SingnatureOfEmployee: String,
    Date: Date,

    entrydate: String,
    dob: Date,
    designation: String,
    pay: Number,
    grp: String,
    leave: String,
    otherleave: String,
    Aparfrom: Date,
    Aparupto: Date,
    Apardate: Date
});

export default mongoose.model("User", userSchema);