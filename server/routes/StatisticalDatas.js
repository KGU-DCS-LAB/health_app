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
    callback(result);
}

router.post('/save', function (req, res) {
    const json = req.body.data;
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

router.get('/calcRate', function(req, res) {
    StatisticalData.find().then( (datas) => {
        datas.forEach((data) => {
            clacAndSave(data, function(result){
                console.log('done')
            })
        })
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

function clacAndSave(data, callback){
    const result = {}
    result.calculate = [];
    let male = []
    let female = []
    const statistics = data.statistics;
    statistics.forEach((statistic) => {
        // const month = statistic.month.split(' ')[1];
        // console.log(month);
        const count = statistic.count;

        count.male.forEach((m) => {
            if(m.num === '-'){
                male.push({age: m.age, rate: 0})
            }else {
                const rate = m.num / count.total * 100
                male.push({age: m.age, rate: rate})
            }
        })
        console.log(male)
        count.female.forEach((f) => {
            if(f.num === '-'){
                female.push({age: f.age, rate: 0})
            }else {
                const rate = f.num / count.total * 100
                female.push({age: f.age, rate: rate})
            }
        })
        console.log(female)
        result.calculate.push({month: statistic.month, rate: {male: male, female: female}})
        male = [];
        female = [];
    })
    // console.log(result);
    avgOfRage(result);
}

const avgOfRage = (datas) => {
    const result = {}
    result.calculate = [];
    let male = []
    let female = []
    const calculate = datas.calculate;
    for (let i=0; i<12; i++){
        const month = calculate[i].month.split(" ")[1];
        male = calculate[i].rate.male;
        for (let k=12; k<calculate.length; k += 12){
            for(let j=0; j<male.length; j++){
                // console.log(calculate[k].rate.male[j])
                // male[j]['rate'] = male[j].rate + calculate[k].rate.male[j].rate
            }
        }
    }
}

module.exports = router;