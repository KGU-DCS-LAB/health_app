const express = require('express')
const router = express.Router();
const { Bookmark } = require("../models/Bookmark");

router.post('/save', function(req, res) {
    console.log(req.body);
    // 데이터 저장
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
    // console.log(req.body);
    Bookmark.updateOne(
        { bookmark_name: req.body.data.bookmark_name }, 
        { $push: { bookmark_url: req.body.data.bookmark_url } }, 
        (error, person) => {
            if(error){
                console.log(error);
                return res.json({status: 'error', error})
            }else{
                console.log('Saved!')
                return res.json({status: 'success'})
            }
        });
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

module.exports = router;