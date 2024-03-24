const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        reuired: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    poster: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('Story', storySchema)