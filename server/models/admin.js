const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

// mongoose.connect('mongodb://127.0.0.1:27017/100xCourses');
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
  }
);
  
const adminSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    totalRevenue: {
        type: Number,
        default: 0
    },
    courses: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ] 
});

module.exports = mongoose.model('Admin', adminSchema);