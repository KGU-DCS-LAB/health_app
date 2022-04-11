const mongoose = require('mongoose');

const symptomSchema = mongoose.Schema({
    body_part: {
        type: String,
        maxlength: 30,
        unique: 1,
        required: true
    },
    symptoms: {
        type: Array,
    }
})

const Symptom = mongoose.model('Symptom', symptomSchema)

module.exports = { Symptom }