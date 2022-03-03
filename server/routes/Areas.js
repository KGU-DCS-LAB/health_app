const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { Area } = require("../models/Area");

/* GET. */
router.get('/find', function(req, res, next) {
    // 전체 데이터 가져오기
    Area.find().then( (areas) => {
        // console.log(diseases);
        res.json(areas)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

/* POST 미구현*/
router.post('/save', function(req, res) {
    console.log(req.body);
    // 데이터 저장
    var newArea = new Area(req.body.data);
    newArea.save(function(error, data){
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
    Area.findOne({diseaseID:'5704'}, function(error,disease){
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
    Area.findById({diseaseID:'5704'}, function(error,area){
        console.log('--- Update(PUT) ---');
        if(error){
            console.log(error);
        }else{
            area.name = '--modified--';
            area.save(function(error,modified_area){
                if(error){
                    console.log(error);
                }else{
                    console.log(modified_area);
                }
            });
        }
    });
});

router.get('/delete/', function(req, res, next) {
    // 삭제
    Area.remove({diseaseID:'5704'}, function(error,output){
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