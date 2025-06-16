const express =require("express")
const User = require("./UserRoute.js")
const Product = require ("../models/ProductModel.js")
const {protect, admin} = require("../middleware/authMiddleware.js")

const router = express.Router()

// @route GET /api/admin/products
// @desc Get all productd (admin only)
// @accss Private/Admin

router.get("/", protect, admin, async(req, res) => {
    try {
        const products = await Product.find({});
        res.json(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Server Error"})    
    }
}
)

module.exports = router