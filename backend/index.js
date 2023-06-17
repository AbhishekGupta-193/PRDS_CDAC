import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import userRoutes from './routes/user.js';
import User from './models/user.js'

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000


const URL = "mongodb+srv://anurag174:yNfoQuFCK1wHqPGi@cluster0.pzqlvtr.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(URL,()=>{
    console.log("connected");
});

app.use('/', userRoutes);
app.post("/register",async (req,res)=>{
    const {email,password,request}  = req.body;
    console.log({email,password,request});
    const newObject = {  email,password,request };
    const result = await User.create(newObject);
    res.send({status:200,msg : "successfully register"})
})

app.listen(PORT, () => console.log(`server running at Port : ${PORT}`));