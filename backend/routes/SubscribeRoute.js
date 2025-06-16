const express = require("express")
const Subscriber = require("../models/SubscribeModel.js")
const router = express.Router()

// @route POST /api/subscribe
// @desc Handle newsletter subscription
// @access Public

router.post("/subscribe", async(req, res) => {
    const {email} = req.body
    if(!email) {
        return res.status(404).json({message : "Email is required"});
    }
    try {
        let subscriber = await Subscriber.findOne({email})

        if(subscriber){
        return res.status(400).json({message : "Email is already subscribe"});
        }

        subscriber = new Subscriber({email})
        await subscriber.save()
        res.status(201).json({message : "Succefully subscribe to newslestter"});    
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")    
    }
})

module.exports = router