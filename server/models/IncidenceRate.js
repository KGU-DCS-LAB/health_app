const mongoose = require('mongoose');

const incidenceRate = mongoose.Schema({
    diseaseNum: Number,
    diseaseName: String,
    incidence: [{
        month: String,
        rate: {
            male: [{
                age: String,
                rate: String
            }],
            female: [{
                age: String,
                rate: String
            }]
        }
    }]
}
)

const IncidenceRate = mongoose.model('IncidenceRate', incidenceRate)

module.exports = { IncidenceRate }