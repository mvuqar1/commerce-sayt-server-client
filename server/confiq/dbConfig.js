const mongoose=require("mongoose")

mongoose.connect(process.env.mongo_url)

const connection=mongoose.connection

connection.on("connected",()=>{
    console.log("mongo DB connection is SUCCES")
})
connection.on("error",()=>{
    console.log("mongo DB connection is ERROR")
})

module.exports=connection