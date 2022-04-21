const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { Disease } = require("../models/Disease");

/* GET. */
router.get('/find', function(req, res, next) {
    // 전체 데이터 가져오기
    Disease.find().then( (diseases) => {
        // console.log(diseases);
        res.json(diseases)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

router.get('/findName', function(req, res, next) {
    // 전체 데이터 가져오기
    // Disease.find({ $text : { $search : req.body.data.keyword } } ).sort( { "_id": 1 }).select('-_id 질병명').then( (diseases) => {
    Disease.find().select('-_id 번호 질병명 동의어').distinct('질병명').then( (diseases) => {
        res.json(diseases)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

/* POST 미구현*/
router.post('/save', function(req, res) {
    console.log(req.body);
    // 데이터 저장
    var newDisease = new Disease(req.body.data);
    newDisease.save(function(error, data){
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
    Disease.findOne({diseaseID:'5704'}, function(error,disease){
        console.log('--- Read one ---');
        if(error){
            console.log(error);
        }else{
            console.log(disease);
        }
    });
});

router.get('/modify/', function(req, res, next) {
    // 특정아이디 수정하기
    Disease.findById({diseaseID:'5704'}, function(error,disease){
        console.log('--- Update(PUT) ---');
        if(error){
            console.log(error);
        }else{
            disease.name = '--modified--';
            disease.save(function(error,modified_disease){
                if(error){
                    console.log(error);
                }else{
                    console.log(modified_disease);
                }
            });
        }
    });
});

function setQuery(arr, callback){
    let query = [];
    const regex = (pattern) => new RegExp(`${pattern}`);
    arr.forEach(symptom => {
        query.push({ 증상: regex(symptom) })
    });
    callback(query);
}

router.post('/findBySymptoms', function(req, res, next) {
    // 증상으로 질병 가져오기
    setQuery(req.body.data.symptoms, function(query){
        Disease.find().and(query).select('-_id 번호 질병명 링크').then( (diseases) => {
            res.json(diseases)
        }).catch( (err) => {
            console.log(err);
            next(err)
        });
    });
});

router.get('/delete/', function(req, res, next) {
    // 삭제
    Disease.remove({diseaseID:'5704'}, function(error,output){
        console.log('--- Delete ---');
        if(error){
            console.log(error);
        }

        /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            어떤 과정을 반복적으로 수행 하여도 결과가 동일하다. 삭제한 데이터를 다시 삭제하더라도, 존재하지 않는 데이터를 제거요청 하더라도 오류가 아니기 때문에
            이부분에 대한 처리는 필요없다. 그냥 삭제 된것으로 처리
            */
        console.log('--- deleted ---');
    });
});

module.exports = router;