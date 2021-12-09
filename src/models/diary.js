const mongoose = require('mongoose')

const diarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    file: {
        type: Buffer
    }
}, {
    timestamps: true
})

const Diary = mongoose.model('Diary', diarySchema)

module.exports = Diary