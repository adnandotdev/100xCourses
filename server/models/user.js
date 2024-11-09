const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    courses: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
})

module.exports = mongoose.model('User', userSchema)