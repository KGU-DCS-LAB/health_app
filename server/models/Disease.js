const mongoose = require('mongoose');

const diseaseSchema = mongoose.Schema({
    번호: {
        type: String,
        maxlength: 10,
        unique: 1,
        required: true
    },
    대분류: {
        type: String,
        maxlength: 50,
        required: true
    },
    질병명: {
        type: String,
        maxlength: 50,
        required: true
    },
    증상: {
        type: String,
        maxlength: 200,
        required: true
    },
    관련질환: {
        type: String,
        maxlength: 200,
        required: true
    },
    진료과: {
        type: String,
        maxlength: 50,
    },
    동의어: {
        type: String,
        maxlength: 200,
    }
    //그 외 데이터는 추후 추가 예정
})

const Disease = mongoose.model('Disease', diseaseSchema)

module.exports = { Disease }