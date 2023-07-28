const express=require("express")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors());
const PORT=process.env.PORT || 5001

require("dotenv").config()
//mongoose here (mongoDB)
const dbConfig=require("./confiq/dbConfig")

//routes
const usersRoute=require("./routes/userRoute")


app.use("/api/user",usersRoute)


app.listen(PORT,()=>{
    console.log(`${PORT}`)
})