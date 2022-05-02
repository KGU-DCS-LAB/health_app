const express = require('express')
const router = express.Router();
const { StatisticalData } = require("../models/StatisticalData");

router.post('/save', function(req, res) {
    console.log(req.body);
    var newSdStorage = new StatisticalData(req.body.data);
    newSdStorage.save(function(error, data){
        if(error){
            console.log(error);
            return res.json({status: 'duplicated', error})
        }else{
            console.log('Saved!')
            return res.json({status: 'success'})
        }
    });
});

module.exports = router;