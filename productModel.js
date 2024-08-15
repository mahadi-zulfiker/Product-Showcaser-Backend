const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: String,
    productImg: {
        type: String,
        default: "https://source.unsplash.com/random/200x200?sig="
    },
    description: String,
    brandName: String,
    category: String,
    createdAt: String,
    ratings: Number,
    price: Number
})

productSchema.index({ createdAt: 1 })

const Product = mongoose.model('Product', productSchema)

module.exports = Product;