const express = require("express")
const Checkout = require("../models/CheckoutModel.js")
const Cart = require("../models/CartModel.js")
const Product = require("../models/ProductModel.js")
const Order = require("../models/OrderModel.js")
const {protect} = require("../middleware/authMiddleware.js")

router = express.Router()
// @route POST /apip/chekcout
// @desc Create a new checkout session
// @access Private
 
router.post("/",protect, async (req, res) => {
    const{checkoutItems, shippingAddress , paymentMethod, totalPrice} = req.body
   
    if(!checkoutItems || checkoutItems.length === 0){
        return res.status(404).json({message : "No items in checkout"})
    }
    try {
        // Create new checkout session
        const newCheckout = await Checkout.create({
            user: req.user.id,
            checkoutItems : checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false
        })
        console.log(`checkout created for user: ${req.user._id}`)
        res.status(201).json(newCheckout)
    } catch (error) {
        console.error("Error Creating checkout session:",error);
        res.status(500).json({message : "server Errorcf"})
    }

})

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after succeful payment
// @access Private

router.put("/:id/pay", protect, async(req , res)=> {
    const {paymentStatus, paymentDetails } = req.body
    try {
        const checkout = await Checkout.findById(req.params.id)
        if(!checkout){
            return res.status(404).json({message : "No checkout"})
        }
        if(paymentStatus === "paid"){
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails =paymentDetails,
            checkout.paidAt = Date.now(),
            await checkout.save()
            res.status(200).json(checkout)
        } else {
            res.status(400).json({message : "Invalid Payment status"})

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "server Errorcf"})        
    }

})

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment
// @access Private

router.post("/:id/finalize" , protect, async (req,res)=>{
    try {
        const checkout = await Checkout.findById(req.params.id)
        if(!checkout){
            return res.status(404).json({message : "Checkout not found"})
        }
        if(checkout.isPaid && !checkout.isFinalized){
            //  Create final order
            const finalOrder = await Order.create({
                user : checkout.user,
                orderItems : checkout.checkoutItems,
                shippingAddress : checkout.shippingAddress,
                paymentMethod : checkout.paymentMethod,
                totalPrice : checkout.totalPrice,
                isPaid : true,
                paidAt : checkout.paidAt,
                isDelivered : false,
                paymentStatus: "paid",
                paymentDetails : checkout.paymentDetails     
            })
            checkout.isFinalized = true,
            checkout.finalizedAt = Date.now(),
            await checkout.save()

            await Cart.findOneAndDelete({user : checkout.user})
            res.status(201).json(finalOrder)
        }else if(checkout.isFinalized){
            res.status(400).json({message : "Checkout already finalized"})
        } else {
            res.status(400).json({message : "Checkout is not paid"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message :"Server Error"})
        
    }
})

module.exports= router
