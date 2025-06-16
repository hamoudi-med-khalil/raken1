const express = require("express")
const User = require("../models/UserModel.js")
const jwt = require("jsonwebtoken")
 const {protect} = require("../middleware/authMiddleware.js")


const router = express.Router()

// @route Post /api/users/register
// @desc register new user
// @access Public
// Comment

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // register logic
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "User already exist" })
        user = new User({ name, email, password })
        await user.save()
        // create jwt payload
        const payload = { user: { id: user._id, role: user.role } }
        // Sign and return the token  
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
            if (err) throw err;
            // Send the user and token
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }, token
            })
        })

    } catch (error) {
        console.log(error)
        res.status(500).send("server Error");
    }
})

// @POST /api/users/login
// @desc Authenticate user
// @access public

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "Invalid credential" })
        const isMatch = await user.matchPassword(password)
        if (!isMatch) return res.status(400).json({ message: "Password doest match" })
        // create jwt payload
        const payload = { user: { id: user._id, role: user.role } }
        // Sign and return the token  
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
            if (err) throw err;
            // Send the user and token
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")

    }
});

// @GET api/users/profile
// @desc get logged-in profile (Protected route)
// @access Private

router.get("/profile", protect, async(req,res)=>{
    res.json(req.user);
})



module.exports = router