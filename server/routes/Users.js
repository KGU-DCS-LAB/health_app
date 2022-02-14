const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { User } = require("../models/User");

/* GET home page. */
router.get('/find', function(req, res, next) {
    // 전체 데이터 가져오기
    User.find({} , {"_id" : 0}).then( (users) => {
        console.log(users);
        res.json(users)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

/* POST */
router.post('/save', function(req, res, next) {
    let id = req.body.user_id;
    let password = req.body.password;
    console.log("id:", id, "pwd:", password); 
    // res.render('result_page', { title: 'Express', id: id, age: password, method: "post" });
    // 데이터 저장
    var newUser = new User(req.body);
    console.log('3', newUser);
    newUser.save(function(error, data){
        if(error){
            console.log(error);
        }else{
            console.log('Saved!')
        }
    });
});


router.get('/findOne/', function(req, res, next) {
    // 특정 아이디값 가져오기
    User.findOne({user_id:'201912069'}, function(error,student){
        console.log('--- Read one ---');
        if(error){
            console.log(error);
        }else{
            console.log(student);
        }
    });
});

router.get('/modify/', function(req, res, next) {
    // 특정아이디 수정하기
    User.findById({user_id:'201912069'}, function(error,student){
        console.log('--- Update(PUT) ---');
        if(error){
            console.log(error);
        }else{
            student.name = '--modified--';
            student.save(function(error,modified_student){
                if(error){
                    console.log(error);
                }else{
                    console.log(modified_student);
                }
            });
        }
    });
});

router.get('/delete/', function(req, res, next) {
    // 삭제
    User.remove({user_id:'201912069'}, function(error,output){
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