const mongoose = require('mongoose');

const areaSchema = mongoose.Schema({
    행정구역코드: {
        type: String,
        maxlength: 10,
        unique: 1,
        required: true
    },
    level1: {
        type: String,
        maxlength: 50,
        required: true
    },
    level2: {
        type: String,
        maxlength: 50,
    },
    level3: {
        type: String,
        maxlength: 50,
    },
    X: {
        type: String,
        maxlength: 50,
        required: true
    },
    Y: {
        type: String,
        maxlength: 50,
        required: true
    }
})

const Area = mongoose.model('Area', areaSchema)

module.exports = { Area }