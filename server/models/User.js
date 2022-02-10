const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_id: {
        type: String,
        maxlength: 30,
        unique: 1,
        required: true
    },
    password: {
        type: String,
        maxlength: 50,
        required: true
    },
    user_name: {
        type: String,
        maxlength: 30,
        required: true
    },
    birthday: {
        type : Date,
        required: true
    },
    gender: {
        type: String,
        maxlength: 10,
        required: true
    },
    residence: {
        type: String,
        maxlength: 100,
        required: true
    },
    news_bookmark: {
        type: Number
    },
    role: { // 사용자나 관리자 구분
        type: Number,
        default: 0
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }