const express = require("express")
const router = express.Router()
const Notifications = require("../models/notificationsModels")
const authMiddleWare = require("../authMiddleWare/authMiddleWare.jsx");

router.post("/add-notification", async (req, res) => {

    try {
        const notification = new Notifications(req.body)
        await notification.save()
        res.send({
            success: true,
            message: "Notification added succesfully"
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.get("/get-all-notifications",authMiddleWare, async (req, res) => {
    try {
        const notifications=await Notifications.find({user:req.body.userId}).sort({createdAt:-1})
        res.send({
            success: true,
            message: notifications
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.delete("/delete-notification/:id",async(req,res)=>{
    try {
       await Notifications.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            message: "Notification delete succesfully"
        })
    } catch (error) {   
        res.send({
            success: false,
            message: error.message
        }) 
    }
})

router.put("/read-all-notifications",authMiddleWare,async(req,res)=>{
    try {
        await Notifications.updateMany(
            {user:req.body.userId,read:false},
            {read:true}
        )
        res.send({
            success: true,
            message: "Reads all notifications"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })       
    }
})
module.exports = router