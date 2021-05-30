const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    products: [
        {  
            name: {
                    type: String,
                    required: true,
                    trim: true
            },
            priceInDollars: {
                type: Number,
                required: true,
                trim: true
            }  
        }
    ],
    userId: {
        type: String,
        required: true
    },
    deliveryDate: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order