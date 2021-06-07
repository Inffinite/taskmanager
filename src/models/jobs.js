const mongoose = require('mongoose')
const jobsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Jobs = mongoose.model('Jobs', jobsSchema)
module.exports = Jobs