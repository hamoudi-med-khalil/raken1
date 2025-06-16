const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Product = require("./models/ProductModel.js")
const User = require("./models/UserModel.js")
const Cart = require("./models/CartModel.js")
const products = require("./data/products.js")

dotenv.config()

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI)

// function to seed Data
const seedData = async()=>{
    try {
        await Product.deleteMany()
        await User.deleteMany()
        await Cart.deleteMany()

        // Create a default admin user
        const createUser = await User.create({
            name: "Admin user",
            email :"admin@admin.com",
            password : "123456",
            role : "admin"
        })

        // Assign the default user Id to each product
        const userID = createUser._id;

        const sampleProducts = products.map((product)=>{
            return {...product, user : userID}
        })

        // Insert Product into the database
        await Product.insertMany(sampleProducts)

        console.log("Product data seeded success")
        process.exit()

    } catch (error) {
        console.error("Error seeding the data:", error);
        process.exit(1)
        
    }
}
seedData()