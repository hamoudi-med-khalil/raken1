const express = require("express")
const Order = require("../models/OrderModel.js")
const {protect} = require ("../middleware/authMiddleware.js")

const router = express.Router()

// @route GET /api/orders/my-orders
// @desc Get logged-in user's orders
// @access Private

router.get("/my-orders",protect, async(req,res) => {  
    console.log(1)
    try {
        
        const orders = await Order.find({user : req.user._id}).sort({
        createdAt : -1
    })
    res.json(orders)
    console.log(orders)
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "server Error"})  
    }
})

// @route GET /api/orders/:id
// @desc Get order details  by id
// @access Private

router.get("/:id",protect, async(req,res) => {  
    try {
        const order = await Order.findById(req.params.id).populate(
            "user", "name email"
        )
        if(!order){
        res.status(404).json({message : "Order Not found"})  
        }
        res.json(order)
    }catch (error) {
        console.error(error);
        res.status(500).json({message : "server Error"})  
    }
})



module.exports = router