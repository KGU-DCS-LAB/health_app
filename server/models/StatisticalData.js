const mongoose = require('mongoose');

const statisticalData = mongoose.Schema({
    diseaseName: {
        type: String,
        maxlength: 30,
        unique: 1,
        required: true
    },
    patientCount: [{
        month: String,
        count: [{
            total: String,
            male: [{
                age: String,
                num: String
            }],
            female: [{
                age: String,
                num: String
            }]
        }]
    }]
}
)

const StatisticalData = mongoose.model('StatisticalData', statisticalData)

module.exports = { StatisticalData }