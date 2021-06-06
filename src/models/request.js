const mongoose = require('mongoose')
const requestSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    room: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Request = mongoose.model('Request', requestSchema)
module.exports = Request