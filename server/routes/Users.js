const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { User } = require("../models/User");
const nodemailer = require("nodemailer");
const senderInfo = require('../config/SenderInfo.json');

/* GET. */
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

/* POST 미구현*/
router.post('/save', function(req, res) {
    console.log(req.body);
    // 데이터 저장
    var newUser = new User(req.body.data);
    newUser.save(function(error, data){
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

// 메일 인증번호 보내기
router.post('/mail', function(req, res) {
    const num = req.body.data.randomNum;
    const transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: senderInfo.user,
          pass: senderInfo.pass,
        },
      })

    transport.sendMail({
        from: `HealthApp <kguhealthapp@gmail.com>`,
        to: req.body.data.user_email,
        subject: '[HealthApp] 인증번호가 도착했습니다.',
        text: '123456',
        html: `<div 
            style='
            text-align: center; 
            width: 50%; 
            height: 60%;
            margin: 15%;
            padding: 20px;
            box-shadow: 1px 1px 3px 0px #999;
            '>
            <h2>${req.body.data.user_id} 님<br/> 안녕하세요.</h2> <br/> <h2 style="color: #FA5882">HealthApp</h2> <br/><h3>인증번호 : ${num} </h3><br/><br/><br/><br/></div>`})
        return res.json({status: 'Success'})
});

router.get('/modifyPw/', function(req, res) {
    const userId = req.body.data.user_id;
    const userPw = req.body.data.password;

    User.findById({user_id: userId}, function(error,user){
        if(error) {  
            res.redirect('/');
          } else {
            user.updateOne({$set : {password : userPw}}).exec();
            return res.json({status: 'success'})
          }
    });
});

module.exports = router;