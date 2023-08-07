const express=require("express")
const router=express.Router()
const Products=require("../models/productModel")
const authMiddleWare = require("../authMiddleWare/authMiddleWare.jsx");

//add a new product
router.post("/add-product",async(req,res)=>{
    try {
        const newProduct=new Products(req.body)
        await newProduct.save()
        res.send({
            success:true,
            message:"Product added succesfully"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

//get all products
router.get("/get-products",async(req,res)=>{
    try {
        const products=await Products.find()
        console.log(products)
        res.send({
            success:true,
            products
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})


//edit  products
router.put("/edit-product/:id",async(req,res)=>{
    try {
        const products=await Products.findByIdAndUpdate(req.params.id,req.body)
        res.send({
            success:true,
            message:"Product update successfully"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

//delete  products
router.delete("/delete-product/:id",async(req,res)=>{
    console.log(req.params.id)

    try {
        const products=await Products.findByIdAndDelete(req.params.id)
        res.send({
            success:true,
            message:"Product delete successfully"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

module.exports=router