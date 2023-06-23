import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/routes.js";
import User from "./models/user.js";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

const URL =
  "mongodb+srv://anurag174:yNfoQuFCK1wHqPGi@cluster0.pzqlvtr.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(URL, () => {
  console.log("connected");
});

app.use("/", userRoutes);
app.post("/register", async (req, res) => {
  const userdata = req.body;
  console.log("register");
  const result = await User.create(userdata);
  res.send({ status: 200, msg: "successfully register" });
});

app.get("/getUsers", async (req, res) => {
  let users = await User.find({});
  res.send(users);
});

app.post("/getCurUser", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`server running at Port : ${PORT}`));
