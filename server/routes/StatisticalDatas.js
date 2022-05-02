const express = require('express')
const router = express.Router();
const { StatisticalData } = require("../models/StatisticalData");

function formatDatas(json, diseaseName, callback) {
    const result = {}
    result.diseaseName = diseaseName;
    result.statistics = [];
    const months = json[2];
    const total = json[4];
    let male = []
    let female = []
    for (let i = 2; i < 181; i += 5) {
        const key = '__EMPTY_' + i;
        for (let k = 5; k < json.length; k++) {
            const datas = json[k]
            if (datas.__EMPTY === '남') {
                male.push({ age: datas.__EMPTY_1, num: datas[key] })
            }
            if (datas.__EMPTY === '여') {
                female.push({ age: datas.__EMPTY_1, num: datas[key] })
            }
        }
        result.statistics.push({ month: months[key], count: { total: total[key], male: male, female: female } })
        male = [];
        female = [];
    }
    console.log(result);
    // console.log(json);
    callback(result);
}

router.post('/save', function (req, res) {
    const json = req.body.data;
    console.log(req.body.data);
    formatDatas(json, req.body.diseaseName, function(result) {
        const newSdStorage = new StatisticalData(result);
        newSdStorage.save(function (error, data) {
            if (error) {
                console.log(error);
                return res.json({ status: 'duplicated', error })
            } else {
                console.log('Saved!')
                return res.json({ status: 'success' })
            }
        });
    })
});

module.exports = router;