var express = require('express');
// const fs = require('fs');
// const path = require('path');
var router = express.Router();
router.post('/',function(req,res,next){
    // fs.readFile(path.join(publicPath))
    console.log(req);
    res.send({aaa:'aaa'});
})
module.exports = router;