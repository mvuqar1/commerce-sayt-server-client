const express = require("express")
const router = express.Router()
const Products = require("../models/productModel")
const authMiddleWare = require("../authMiddleWare/authMiddleWare.jsx");
const cloudinary = require("../confiq/cloudinaryConfig")
const multer = require("multer")

//add a new product
router.post("/add-product", async (req, res) => {
    try {
        const newProduct = new Products(req.body)
        await newProduct.save()
        res.send({
            success: true,
            message: "Product added succesfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//get all products
router.get("/get-products", async (req, res) => {
    try {
        const products = await Products.find().sort({ createdAt: -1 })
        console.log(products)
        res.send({
            success: true,
            products
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//edit  products
router.put("/edit-product/:id", async (req, res) => {
    try {
        const products = await Products.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            success: true,
            message: "Product update successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//delete  products
router.delete("/delete-product/:id", async (req, res) => {
    console.log(req.params.id)

    try {
        const products = await Products.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            message: "Product delete successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//get image from pc
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname) 
    }
});


router.post("/upload-image-to-product", multer({ storage: storage }).single("file"), async (req, res) => {
    console.log(req.file.path)
    try {
        //upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path,{folder:"sheymp"})
    const productId=req.body.productId
    await Products.findByIdAndUpdate(productId,{
        $push:{images:result.secure_url}
    })
    res.send({
        success: true,
        message: "Image uploaded successfully",
        data:result.secure_url
    })
} catch (error) {
    console.log(error)
    res.send({
        success: false,
        message: error.message,
    })
}
})

module.exports = router