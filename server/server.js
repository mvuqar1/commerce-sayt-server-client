const express=require("express")
const cors=require("cors")
require("dotenv").config()

const app=express()

app.use(express.json())
app.use(cors());
const PORT=process.env.PORT || 5001

//mongoose here (mongoDB)
const dbConfig=require("./confiq/dbConfig")

//routes
const usersRoute=require("./routes/userRoute")


app.use("/api/user",usersRoute)


app.listen(PORT,()=>{
    console.log(`${PORT}`)
})