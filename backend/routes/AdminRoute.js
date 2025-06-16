const express = require("express")
const User = require("../models/UserModel.js")
const { protect, admin } = require("../middleware/authMiddleware.js")

const router = express.Router()

// @route GET /api/admin/users
// @desc get all users (Admin only)
// @acces Private Admin

router.get("/", protect, admin, async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
})

// @route POST /api/admin/users
// @desc ADD new users (Admin only)
// @acces Private Admin

router.post("/", protect, admin, async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        user = new User({
            name,
            email,
            password,
            role: role || "customer",
        })
        await user.save()
        res.status(201).json({ message: "User created succefully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
})

// @route PUT /api/admin/users/:id
// @desc Update User  users (Admin only)
// @acces Private Admin

router.put("/:id", protect, admin, async (req, res) => {

    const user = await User.findById(req.params.id)
    const { role } = req.body
    try {
        if (user) {
  
            user.role = role
        }
        const updatedUSer = await user.save()
        res.status(201).json({ message: " User updated succefully", user: updatedUSer })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
})

// @route DELETE /api/admin/users/:id
// @desc delete User  users (Admin only)
// @acces Private Admin

router.delete("/:id", protect, admin , async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(user) {
           await user.deleteOne()
            res.status(201).json({message : "User Deleted"})
        } else {
            res.status(404).json({message : "User Not found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })        
    }
})

module.exports = router