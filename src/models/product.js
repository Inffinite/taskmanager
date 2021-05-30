const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        trim: true
    },
    priceInDollars: {
        type: Number,
        required: true,
        trim: true
    },
    salesCount: {
        type: Number,
        default: 0
    },
    salesTotal: {
        type: Number,
        default: 0
    },
    sale: [
        {
            date: {
                type: String,
                required: true
            },
        }
    ]
}, {
    timestamps: true
})

// productSchema.statics.findProductByName = async (name) => {
//     const myproduct = await Product.findOne({ name: name })

//     if(!myproduct){
//         throw new Error('Product not found')
//     }

//     return myproduct
// }

const Product = mongoose.model('Product', productSchema)
module.exports = Product