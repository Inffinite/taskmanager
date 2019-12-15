const mongoose = require('mongoose')
const chalk = require('chalk')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        trim: true,
        required: true

    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema )

module.exports = Task
