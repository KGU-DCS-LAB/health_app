const mongoose = require('mongoose');

const diseaseSchema = mongoose.Schema({
    diseaseID: {
        type: String,
        maxlength: 10,
        unique: 1,
        required: true
    },
    name: {
        type: String,
        maxlength: 50,
        required: true
    }
    //그 외 데이터는 추후 추가 예정
})

const Disease = mongoose.model('Disease', diseaseSchema)

module.exports = { Disease }