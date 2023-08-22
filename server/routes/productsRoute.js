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
router.post("/get-products", async (req, res) => {
    try {
        const { seller, category, age,status} = req.body
        let filters = {}
        if (seller) {
            filters.seller = seller
        }
        if (status) {
            filters.status = status
        }
        const products = await Products.find(filters).populate("seller").sort({ createdAt: -1 })
        res.send({
            success: true,
            data:products
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
        await Products.findByIdAndUpdate(req.params.id, req.body)
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
    try {
        await Products.findByIdAndDelete(req.params.id)
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
//get product by id
router.get("/get-product-by-id/:id", async (req, res) => {
    console.log(req.params)
    try {
        const product = await Products.findById(req.params.id).populate("seller")
        res.send({
            success: true,
            data:product
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
    try {
        //upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "sheymp" })
        const productId = req.body.productId
        await Products.findByIdAndUpdate(productId, {
            $push: { images: result.secure_url }
        })
        res.send({
            success: true,
            message: "Image uploaded successfully",
            data: result.secure_url
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})

//delete image (na samom dele sdelali map i otpravili cistiy spisok array)
router.put("/delete-image-from-product/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const imagesToKeep = req.body;

        const product = await Products.findById(productId);

        const updatedProduct = await Products.findByIdAndUpdate(
            productId,
            { $pull: { images: { $nin: imagesToKeep } } },
            { new: true }
        );

        // Получите актуальный список изображений из обновленного товара
        const imagesToDelete = product.images.filter(image => !imagesToKeep.includes(image));
        // console.log("imagesToDelete:", imagesToDelete);        ['https://res.cloudinary.com/dmrh8jdqv/image/upload/v1692460920/sheymp/shhmcfdixogtwjzpnfop.jpg']

        // Проход по изображениям для удаления из Cloudinary
        for (const imageUrl of imagesToDelete) {
            const public_id = imageUrl.split("/").slice(-2).join("/").split(".")[0];
            // console.log(public_id)          'sheymp/shhmcfdixogtwjzpnfop'

            await cloudinary.uploader.destroy(public_id);
        }

        res.send({
            success: true,
            message: "Images deleted successfully",
            data: updatedProduct
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

//edit and change status
router.put("/update-product-status/:id", async (req, res) => {
    try {
        const { status } = req.body
        await Products.findByIdAndUpdate(req.params.id, { status })
        res.send({
            success: true,
            message: "Product status update successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router