const express = require('express')
const router = express.Router();
const { Bookmark } = require("../models/Bookmark");

router.post('/save', function(req, res) {
    // console.log(req.body);
    var newBmStorage = new Bookmark(req.body.data);
    newBmStorage.save(function(error, data){
        if(error){
            console.log(error);
            return res.json({status: 'duplicated', error})
        }else{
            console.log('Saved!')
            return res.json({status: 'success'})
        }
    });
});

router.post('/urlSave', function(req, res) {
    Bookmark.updateOne(
        { bookmark_name: req.body.data.bookmark_name }, 
        {$push: {bookmark_info: {
            "img": req.body.data.news_img, 
            "url": req.body.data.news_url,
            "title": req.body.data.news_title,
        }}}).exec();
        (error, url)=>{
            if(error){
                console.log(error);
                return res.json({status: 'error', error})
            }else{
                console.log('Saved!')
                return res.json({status: 'success'})
            }
        };
});

router.get('/find', function(req, res, next) {
    // 전체 데이터 가져오기
    Bookmark.find().then( (bookmarks) => {
        res.json(bookmarks)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

router.get('/findOne/', function(req, res, next) {
    // 특정 아이디값 가져오기
    const bmName = req.query.bookmark_name;
    console.log(bmName);

    Bookmark.findOne({"bookmark_name": bmName}, function(error,news){
        console.log('--- Read one ---');
        if(error){
            console.log(error);
        }else{
            res.json(news)
            
        }
    });
});

module.exports = router;