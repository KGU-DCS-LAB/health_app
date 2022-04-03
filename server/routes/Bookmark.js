const express = require('express')
const router = express.Router();
const { Bookmark } = require("../models/Bookmark");

router.post('/save', function(req, res) {
    console.log(req.body);
    // ������ ����
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
    console.log(req.body);
    let bookmarkName = req.body.data.bookmark_name
    Bookmark.findOneAndUpdate({bookmark_name: bookmarkName}, {'$set' : {
        'bookmark_url.url' :  req.body.data.bookmark_url
    }});
    
});

router.get('/find', function(req, res, next) {
    // ��ü ������ ��������
    Bookmark.find().then( (bookmarks) => {
        res.json(bookmarks)
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

module.exports = router;