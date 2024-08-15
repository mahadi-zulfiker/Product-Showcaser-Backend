require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Product = require('./productModel')

// middlewires
app.use(cors())
app.use(express.json())


const data = [
    {
        "productName": "MacBook Air M2",
        "productImage": "https://example.com/images/macbookairm2.jpg",
        "description": "13-inch MacBook Air with M2 chip, 8GB RAM, and 256GB SSD.",
        "price": 999.99,
        "category": "Laptops",
        "brandName": "Apple",
        "ratings": 4.8,
        "createdAt": "2024-07-15T08:00:00Z"
    },
    {
        "productName": "XPS 15",
        "productImage": "https://example.com/images/xps15.jpg",
        "description": "15.6-inch laptop with Intel i7, 16GB RAM, and 512GB SSD.",
        "price": 1399.99,
        "category": "Laptops",
        "brandName": "Dell",
        "ratings": 4.7,
        "createdAt": "2024-07-14T12:10:00Z"
    },
    {
        "productName": "Surface Laptop 5",
        "productImage": "https://example.com/images/surfacelaptop5.jpg",
        "description": "13.5-inch touchscreen laptop with Intel i5 processor, 8GB RAM, and 256GB SSD.",
        "price": 999.99,
        "category": "Laptops",
        "brandName": "Microsoft",
        "ratings": 4.6,
        "createdAt": "2024-07-13T09:30:00Z"
    },
    {
        "productName": "Yoga Slim 7",
        "productImage": "https://example.com/images/yogaslim7.jpg",
        "description": "14-inch ultra-portable laptop with AMD Ryzen 7, 16GB RAM, and 512GB SSD.",
        "price": 1099.99,
        "category": "Laptops",
        "brandName": "Lenovo",
        "ratings": 4.7,
        "createdAt": "2024-07-12T14:45:00Z"
    },
    {
        "productName": "Aspire 5",
        "productImage": "https://example.com/images/aspire5.jpg",
        "description": "15.6-inch budget laptop with Intel i5, 8GB RAM, and 256GB SSD.",
        "price": 599.99,
        "category": "Laptops",
        "brandName": "Acer",
        "ratings": 4.3,
        "createdAt": "2024-07-11T10:50:00Z"
    },
    {
        "productName": "Blade Stealth 13",
        "productImage": "https://example.com/images/bladestealth13.jpg",
        "description": "13.3-inch ultraportable gaming laptop with Intel i7, 16GB RAM, and 512GB SSD.",
        "price": 1599.99,
        "category": "Laptops",
        "brandName": "Razer",
        "ratings": 4.8,
        "createdAt": "2024-07-10T11:20:00Z"
    },
    {
        "productName": "Chromebook Flip",
        "productImage": "https://example.com/images/chromebookflip.jpg",
        "description": "14-inch 2-in-1 Chromebook with Intel i3, 8GB RAM, and 128GB SSD.",
        "price": 499.99,
        "category": "Laptops",
        "brandName": "ASUS",
        "ratings": 4.5,
        "createdAt": "2024-07-09T13:50:00Z"
    },
    {
        "productName": "Pavilion Gaming 16",
        "productImage": "https://example.com/images/paviliongaming16.jpg",
        "description": "16.1-inch gaming laptop with Intel i5, 8GB RAM, and 512GB SSD.",
        "price": 899.99,
        "category": "Laptops",
        "brandName": "HP",
        "ratings": 4.6,
        "createdAt": "2024-07-08T15:00:00Z"
    },
    {
        "productName": "ThinkPad T14s",
        "productImage": "https://example.com/images/thinkpadt14s.jpg",
        "description": "14-inch business laptop with Intel i7, 16GB RAM, and 1TB SSD.",
        "price": 1499.99,
        "category": "Laptops",
        "brandName": "Lenovo",
        "ratings": 4.7,
        "createdAt": "2024-07-07T09:40:00Z"
    },
    {
        "productName": "Vivobook S14",
        "productImage": "https://example.com/images/vivobooks14.jpg",
        "description": "14-inch laptop with Intel i5, 8GB RAM, and 512GB SSD.",
        "price": 749.99,
        "category": "Laptops",
        "brandName": "ASUS",
        "ratings": 4.4,
        "createdAt": "2024-07-06T14:20:00Z"
    },
    {
        "productName": "iPhone 14 Pro",
        "productImage": "https://example.com/images/iphone14pro.jpg",
        "description": "6.1-inch smartphone with A16 Bionic chip, 128GB storage, and Pro camera system.",
        "price": 999.99,
        "category": "Phones",
        "brandName": "Apple",
        "ratings": 4.9,
        "createdAt": "2024-07-05T08:30:00Z"
    },
    {
        "productName": "Galaxy S23 Ultra",
        "productImage": "https://example.com/images/galaxys23ultra.jpg",
        "description": "6.8-inch smartphone with Snapdragon 8 Gen 2, 256GB storage, and 108MP camera.",
        "price": 1199.99,
        "category": "Phones",
        "brandName": "Samsung",
        "ratings": 4.8,
        "createdAt": "2024-07-04T12:00:00Z"
    },
    {
        "productName": "Pixel 7 Pro",
        "productImage": "https://example.com/images/pixel7pro.jpg",
        "description": "6.7-inch smartphone with Google Tensor G2, 128GB storage, and triple camera system.",
        "price": 899.99,
        "category": "Phones",
        "brandName": "Google",
        "ratings": 4.7,
        "createdAt": "2024-07-03T11:10:00Z"
    },
    {
        "productName": "OnePlus 11",
        "productImage": "https://example.com/images/oneplus11.jpg",
        "description": "6.7-inch smartphone with Snapdragon 8 Gen 2, 256GB storage, and Hasselblad camera.",
        "price": 799.99,
        "category": "Phones",
        "brandName": "OnePlus",
        "ratings": 4.6,
        "createdAt": "2024-07-02T13:20:00Z"
    },
    {
        "productName": "Xperia 1 V",
        "productImage": "https://example.com/images/xperia1v.jpg",
        "description": "6.5-inch 4K OLED smartphone with Snapdragon 8 Gen 2, 128GB storage, and pro-grade camera.",
        "price": 1099.99,
        "category": "Phones",
        "brandName": "Sony",
        "ratings": 4.5,
        "createdAt": "2024-07-01T15:30:00Z"
    },
    {
        "productName": "Mi 13 Pro",
        "productImage": "https://example.com/images/mi13pro.jpg",
        "description": "6.73-inch smartphone with Snapdragon 8 Gen 2, 256GB storage, and Leica camera system.",
        "price": 749.99,
        "category": "Phones",
        "brandName": "Xiaomi",
        "ratings": 4.7,
        "createdAt": "2024-06-30T14:40:00Z"
    },
    {
        "productName": "Find X6 Pro",
        "productImage": "https://example.com/images/findx6pro.jpg",
        "description": "6.82-inch smartphone with Snapdragon 8 Gen 2, 256GB storage, and 50MP triple camera.",
        "price": 999.99,
        "category": "Phones",
        "brandName": "Oppo",
        "ratings": 4.6,
        "createdAt": "2024-06-29T09:10:00Z"
    }
]


mongoose.connect(process.env.URI).then(() => console.log("Connected to DB!"))


app.get('/', async (req, res) => {
    await Product.insertMany(data).catch(err => console.log(err))
    // const result = await Product.distinct("brandName")
    res.send("|")
})

app.get('/products/filterOptions', async (req, res) => {
    try {
        const [brandNames, categorys] = await Promise.all([Product.distinct("brandName"), Product.distinct("category")])

        res.status(200).json({
            brandNames,
            categorys
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

app.get('/products', async (req, res) => {
    try {
        const { search, page = 1, category, sort, brand } = req.query;

        let query = Product.find({})

        if (search) {
            query = query.find({ productName: { $regex: search, $options: "i" } })
        }

        if (sort) {
            console.log(sort);
            const newSort = sort.split(",").join(" ")
            query = query.sort(newSort)
        }

        if (category) {
            query = query.find({ category })
        }

        if (brand) {
            query = query.find({ brandName: brand })
        }


        const estProducts = await query.clone().countDocuments()

        query = query.skip((page - 1) * 12).limit(12)

        const result = await query.limit(12).select("-__v")

        res.send({
            totalDocCount: estProducts,
            data: result
        })


    } catch (error) {

        console.log(error);

    }
})

app.listen(port, () => {
    console.log("running at", port);
})

