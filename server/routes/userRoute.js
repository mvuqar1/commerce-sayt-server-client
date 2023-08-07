const express=require("express")
const router=express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User=require("../models/userModel");
const authMiddleWare = require("../authMiddleWare/authMiddleWare.jsx");

router.post("/register",async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        if(user){
            throw new Error("User already exists")
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        req.body.password=hashedPassword

        //save user
        const newUser=new User(req.body)
        await newUser.save()
        res.send({
            succes:true,
            message:"User created succesfull"
        })
    } catch (error) {
        res.send({
            succes:false,
            message:error.message,
        })
    }
})

router.post("/login",async(req,res)=>{
    const user=await User.findOne({email:req.body.email})

    //chech if the user exists
    try {
        if (!user){
            throw new Error("User not found")
        }
        //compare password
        const validPassword=await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validPassword){
            throw new Error("Invalid pasword")
        }

        //create and assign token
        const token=jwt.sign({userId:user._id},process.env.jwt_secret,{expiresIn:"1d"})
        
        //send response
        res.send({
            succes:true,
            message:"User created succesfull",
            data:token
        })
    } catch (error) {
        console.log(error)
        res.send({
            succes:false,
            message:error.message,
        })
    }
})

router.get("/get-current-user",authMiddleWare,async(req,res)=>{
    try {
        const user=await User.findById(req.body.userId)
        res.send({
            succes:true,
            message:"Fetched successfully",
            data:user
        })
    } catch (error) {
        res.send({
            succes:false,
            message:error.message
        })
    }
})

module.exports=router