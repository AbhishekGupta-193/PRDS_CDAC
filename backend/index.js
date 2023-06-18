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
    const userdata  = req.body;
    console.log('register');
    console.log(userdata,' userdata');
    console.log(userdata.additionalComments, "additional cmt");
    // const newObject = {  email,password,request };
    const result = await User.create(userdata);
    res.send({status:200,msg : "successfully register"})
})

app.get("/getUsers", async (req,res)=>{
        console.log("getusers request");
        let users= await  User.find({});
        console.log(users);
        res.send(users);
    
})


app.listen(PORT, () => console.log(`server running at Port : ${PORT}`));