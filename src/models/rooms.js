const mongoose = require('mongoose')
const roomsSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    booked: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

const Rooms = mongoose.model('Rooms', roomsSchema)
module.exports = Rooms