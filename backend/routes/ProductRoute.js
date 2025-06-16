const express = require("express")
const Product = require("../models/ProductModel.js")
const { protect, admin } = require("../middleware/authMiddleware.js")

const router = express.Router()



// @route GET /api/products/best-seller
// @desc get similar product based on gender and category
// @access Public

router.get("/best-seller", async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({ rating: -1 });
        if (bestSeller) {
            res.json(bestSeller)
        } else {
            res.status(404).json({ message: "No best Seller Product" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")

    }
})



// @route POST /api/products
// @desc Create a new Product
// access Private/admin

router.post("/", protect, admin, async (req, res) => {
    try {
        const { name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimension,
            weight,
            sku
        } = req.body

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimension,
            weight,
            sku,
            user: req.user._id
        })
        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
})


// @route PUT /api/products/:id
// @desc Update a Product
// access Private/admin

router.put("/:id", protect, admin, async (req, res) => {
    const {
        name,
        description,
        price,
        discountPrice,
        countInStock,
        category,
        brand,
        sizes,
        colors,
        collections,
        material,
        gender,
        images,
        isFeatured,
        isPublished,
        tags,
        dimension,
        weight,
        sku
    } = req.body
    try {


        // find Product
        const product = await Product.findById(req.params.id)


        if (product) {
            product.name = name || product.name,
                product.description = description || product.description,
                product.price = price || product.price,
                product.discountPrice = discountPrice || product.discountPrice,
                product.countInStock = countInStock || product.countInStock,
                product.category = category || product.category,
                product.brand = brand || product.brand,
                product.sizes = sizes || product.sizes,
                product.colors = colors || product.colors,
                product.collections = collections || product.collections,
                product.material = material || product.material,
                product.gender = gender || product.gender,
                product.images = images || product.images
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured,
                product.isPublished = isPublished !== undefined ? isPublished : product.isPublished,
                product.tags = tags || product.tags,
                product.dimension = dimension || product.dimension,
                product.weight = weight || product.weight,
                product.sku = sku || product.sku

            const updatedProduct = await product.save()

            res.json(updatedProduct)
        } else {
            res.status(404).json({ message: "Product Not Found" })
        }


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
})


// @route DELETE /api/products/:id
// @desc Delete a product
// @access private/admin

router.delete("/:id", protect, admin, async (req, res) => {
    const product = await Product.findById(req.params.id)
    console.log(req.params.id)

    try {
        if (product) {
            await product.deleteOne();
            res.status(200).send("product Deleted")
        } else {
            res.status(404).send("product Not found")

        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
})

// @route GET /api/products
// @desc get all products with optional query filter
// @access Public

router.get("/", async (req, res) => {
    try {
        const {
            collection,
            size,
            color,
            gender,
            minPrice,
            maxPrice,
            sortBy,
            search,
            category,
            material,
            brand,
            limit } = req.query;

        let query = {};

        //  filter Logic
        if (collection && collection.toLocaleLowerCase() !== "all") {
            query.collections = collection
        }
        if (category && category.toLocaleLowerCase() !== "all") {
            query.category = category
        }
        if (material) {
            query.material = { $in: material.split(",") }
        }
        if (brand) {
            query.brand = { $in: brand.split(",") }
        }
        if (size) {
            query.sizes = { $in: size.split(",") }
        }
        if (color) {
            query.colors = { $in: [color] }
        }
        if (gender) {
            query.gender = gender
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice)
            if (maxPrice) query.price.$lte = Number(maxPrice)
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        }
        // Sort Logic
        let sort = {}
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 }
                    break;
                case "priceDesc":
                    sort = { price: -1 }
                    break;
                case "popularity":
                    sort = { rating: -1 }
                    break;
                default:
                    break;

            }
        }
        // Fetch products and apply filters
        let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
        res.json(products)

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")

    }
})


// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 products
// @access Public

router.get("/new-arrivals", async (req, res) => {
    try {
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8)
        res.json(newArrivals)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
})


// @route GET /api/products/:id
// @desc get single product
// @access Punlic

router.get("/:id", async (req, res) => {
    const productID = req.params.id
    try {
        const product = await Product.findById(productID)

        if (product) {
            res.status(201).json(product)
        } else {
            res.status(404).json({ message: "Product Not Found" })
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")

    }
})

// @route GET /api/products/similare/id
// @desc get similar product based on gender and category
// @access Public

router.get("/similar/:id", async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        const similarProduct = await Product.find({
            _id: { $ne: id },
            category: product.category,
        }).limit(4);

        res.status(201).json(similarProduct)

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
})



module.exports = router