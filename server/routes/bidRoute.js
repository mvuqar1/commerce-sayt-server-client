const express = require("express")
const router = express.Router()
const Bid = require("../models/bidModel")
const authMiddleWare = require("../authMiddleWare/authMiddleWare.jsx");


//add a new bid
router.post("/add-bid", async (req, res) => {
    try {
        const newBid = new Bid(req.body)
        await newBid.save()
        res.send({
            success: true,
            message: "Bid added succesfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})
//get all bids
router.post("/get-all-bids", async (req, res) => {
    try {
        const {product,seller}=req.body
        let filters={}
        if(product){
            filters.product=product
        }
        if(seller){
            filters.seller=seller
        }
        const bids=await Bid.find(filters)
        .populate("product")
        .populate("seller")
        .populate("buyer")

        res.send({
            success: true,
            data: bids
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router