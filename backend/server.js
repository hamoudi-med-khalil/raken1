const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db.js")
const userRoutes = require("./routes/UserRoute.js")
const productRoutes = require("./routes/ProductRoute.js")
const cartRoutes = require("./routes/CartRoute.js")
const checkoutRoutes = require("./routes/checkoutRoutes.js")
const OrderRoutes = require("./routes/OrderRoute.js")
const UploadeRoute = require("./routes/UploadRoute.js")
const SubscriberRoute = require("./routes/SubscribeRoute.js")
const AdminRoute = require("./routes/AdminRoute.js")
const ProductAdminRoute = require("./routes/ProductAdminRoute.js")
const AdminOrderRoute = require("./routes/AdminOrderRoute.js")


const app = express()
app.use(express.json())
app.use(cors())

dotenv.config()

const PORT = process.env.PORT || 3000

// Connect MongoDB
connectDB()


app.get("/", (req,res)=>{
    res.send("Welcome to Tunisia")
})


// API Users  Routes 
app.use("/api/users", userRoutes)
// API Products Routes
app.use("/api/products", productRoutes)
// API Cart Routes
app.use("/api/cart", cartRoutes)
// API checkout Routes
app.use("/api/checkout", checkoutRoutes)
// API orders Routes
app.use("/api/orders", OrderRoutes)
// API Upload Routes
app.use("/api/upload", UploadeRoute)
// API Subscribe Routes
app.use("/api", SubscriberRoute)
// API Users Admin Routes
app.use("/api/admin/users", AdminRoute)
// API Products Admin Routes
app.use("/api/admin/products", ProductAdminRoute)
// API Orders Admin Routes
app.use("/api/admin/orders", AdminOrderRoute)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

