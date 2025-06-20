const express = require("express")
const Cart = require("../models/CartModel.js")
const Product = require("../models/ProductModel.js")
const { protect } = require("../middleware/authMiddleware.js")

const router = express.Router()

//  Helper function to get cart by user or logedIn 
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId })
    } else if (guestId) {
        return await Cart.findOne({ guestId })
    }
    return null;
}


// @route Post /api/cart
// @desc Add a product to the cart for a guest or logged in user
// @access Public

router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) res.status(404).json({ message: "Product Not Found" })

        // Determine if the user is logged in or guest
        let cart = await getCart(userId, guestId)

        if (cart) {
            const productIndex = cart.products.findIndex((p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
            )
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                })
            }
            // Recalculate the total Price
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
            await cart.save()
            return res.status(200).json(cart)
        } else {
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity,
                    }
                ],
                totalPrice: product.price * quantity
            })
            return res.status(201).json(newCart)
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })


    }
})

// @route PUt /api/cart/
// @desc Update a product to change quantity
// @access Public
router.put("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found" })

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity
            } else {
                cart.products.splice(productIndex, 1)
            }
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
            await cart.save()
            return res.status(200).json(cart)
        } else {
            return res.status(404).json({ message: "Product not found in cart" })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error")

    }
})

// @route DELETE /api/cart/
// @desc Remove a product from cart
// @access Public

router.delete("/", async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId, guestId)
        if (!cart) return res.status(404).json({ message: "Cart not found" })
        const productIndex = cart.products.findIndex((p) =>
            p.productId.toString() === productId &&
            p.size === size &&
            p.color === color
        );
        if (productIndex > -1) {
            cart.products.splice(productIndex, 1)
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)

            await cart.save();
            return res.status(201).json(cart)
        } else {
            return res.status(404).json({ message: "Product Not found" })

        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error")
    }
})

// @route GET /api/cart/
// @desc Get logged-in user or guest user's cart
// @access Public

router.get("/", async (req, res) => {
    const { userId, guestId } = req.query;
    try {
        const cart = await getCart(userId, guestId)
        if (cart) {
            res.json(cart)
        } else {
            res.status(404).json({ message: "cart Not found" })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error")
    }
})
// @route POST/api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body
    try {
        const guestCart = await Cart.findOne({ guestId })
        const userCart = await Cart.findOne({ user: req.user._id })

        if (guestCart) {
            if (guestCart.length === 0) {
                return res.status(404).json({ message: "Guest cart is empty" })
            }
            if (userCart) {
                guestCart.products.forEach((gusetItem) => {
                    const productIndex = userCart.products.findIndex(
                        (item) =>
                            item.productId.toString() === gusetItem.productId.toString() &&
                            item.size === gusetItem.size &&
                            item.color === gusetItem.color
                    )
                    if (productIndex > -1) {
                        userCart.products[productIndex].quantity += gusetItem.quantity
                    } else {
                        userCart.products.push(gusetItem)
                    }
                })
                userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
                await userCart.save()
                // Remove the guest cart after merging
                try {
                    await Cart.findOneAndDelete({ guestId })

                } catch (error) {
                }
                res.status(200).json(userCart);
            } else {
                guestCart.user = req.user._id
                guestCart.guestId = undefined
                await guestCart.save()
                res.status(200).json(guestCart)
            }
        } else {
            if (userCart) {
                return res.status(200).json(userCart)
            }
            res.status(404).json({ message: "Guest Cart not found" })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error")
    }
})



module.exports = router