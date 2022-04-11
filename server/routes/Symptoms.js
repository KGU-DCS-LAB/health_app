const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { Symptom } = require("../models/Symptom");

/* GET. */
router.get('/find', function(req, res, next) {
    // 전체 데이터 가져오기
    Symptom.find().then( (symptoms) => {
        // console.log(diseases);
        res.json(symptoms)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

router.get('/findName', function(req, res, next) {
    // 전체 데이터 가져오기
    // Symptom.find({ $text : { $search : req.body.data.keyword } } ).sort( { "_id": 1 }).select('-_id 질병명').then( (diseases) => {
        Symptom.find().select('-_id 번호 질병명 동의어').then( (symptoms) => {
        res.json(symptoms)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

/* POST 미구현*/
router.post('/save', function(req, res) {
    console.log(req.body);
    // 데이터 저장
    var newSymptom = new Symptom(req.body.data);
    newSymptom.save(function(error, data){
        if(error){
            console.log(error);
            return res.json({status: 'duplicated', error})
        }else{
            console.log('Saved!')
            return res.json({status: 'success'})
        }
    });
});

router.get('/findOne/', function(req, res, next) {
    // 특정 아이디값 가져오기
    Symptom.findOne({body_part:'눈'}, function(error,symptom){
        console.log('--- Read one ---');
        if(error){
            console.log(error);
        }else{
            console.log(disease);
        }
    });
});

module.exports = router;