const express = require('express')
const router = express.Router();
const { StatisticalData } = require("../models/StatisticalData");
const { IncidenceRate } = require("../models/IncidenceRate");
const { Disease } = require('../models/Disease');

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

const findDiseases = (data, callback) => {
    Disease.find().or([{질병명: {$regex:data.diseaseName}}, {동의어: {$regex:data.diseaseName}}]).select('번호 질병명').then((diseases) => {
        // res.json({usingOr: diseases})
        callback(diseases)
    }).catch((err) => {
        console.log(err);
        next(err)
    });
}

router.get('/calcRate', function(req, res) {
    let returnText = '';
    StatisticalData.find().then( (datas) => {
        datas.forEach((data) => {
            // findDiseases(data, function(disease){diseases = disease; console.log(diseases)})
            clacAndSave(data, function(result){
                findDiseases(data, function(disease){
                    save(disease, result, function(txt){{
                        returnText = txt
                    }})
                })
            })
        })
        return res.json({status: returnText});
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

function save(disease, data, callback){
    disease.forEach((d) => {
        data.diseaseName = d.질병명;
        data.diseaseNum = d.번호;
        const newIrStorage = new IncidenceRate(data);
        newIrStorage.save(function (error, data) {
            if (error) {
                console.log(error);
                // callback("duplicated")
            } else {
                console.log('Saved!')
            }
        });
    })
    callback('success');
}

function clacAndSave(data, callback){
    const result = {}
    result.incidence = [];
    let male = []
    let female = []
    const statistics = data.statistics;
    statistics.forEach((statistic) => {
        // const month = statistic.month.split(' ')[1];
        // console.log(month);
        const count = statistic.count;
        const total = count.total

        let rate = 0;
        count.male.forEach((m) => {
            rate = 0;
            if(m.num === '-'){
                male.push({age: m.age, rate: rate})
            }else {
                const div = parseInt(m.num) / parseInt(total);
                if(div > 0){
                    console.log(statistic.month, " ", m.age, " ", div);
                }
                rate = (parseInt(m.num) / parseInt(total)) / 100;
                male.push({age: m.age, rate: rate})
            }
        })
        // console.log(male)
        count.female.forEach((f) => {
            rate = 0;
            if(f.num === '-'){
                female.push({age: f.age, rate: rate})
            }else {
                rate = parseInt(f.num) / parseInt(total) * 100;
                female.push({age: f.age, rate: rate})
            }
        })
        result.incidence.push({month: statistic.month, rate: {male: male, female: female}})
        male = [];
        female = [];
    })
    // console.log(result);
    const avg = avgOfRage(result);
    callback(avg);
}

const avgOfRage = (datas) => {
    const result = {}
    result.incidence = [];
    let male = []
    let female = []
    const incidence = datas.incidence;
    for (let i=0; i<12; i++){
        const month = incidence[i].month.split(" ")[1];
        male = incidence[i].rate.male;
        for(let j=0; j<male.length; j++){
            for (let k=12; k<incidence.length; k += 12){
                male[j]['rate'] = male[j].rate + incidence[k].rate.male[j].rate
            }
        }
        for(let j=0; j<male.length; j++){
            male[j]['rate'] = male[j].rate / 3
        }
        console.log(male);
        result.incidence.push({month: month, rate: {male: male, female: female}})
    }
    return result;
}

module.exports = router;