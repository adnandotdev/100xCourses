const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    adminId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    users : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    totalRevenuePerCourse: {
        type: Number,
        default: 0
    },
    courseTitle: String,
    courseDescription: String,
    offerPrice: Number,
    originalPrice: Number,
    thumbnail: {
        type: String,
        // default: 'default.jpg'
    },
    date: {
        type: Date,
        default: Date.now
    }
    // user: [
    //     {
    //         type: mongoose.Scheme.Types.ObjectId,
    //         ref: 'user'
    //     }
    // ]
})

module.exports = mongoose.model('Course', courseSchema)