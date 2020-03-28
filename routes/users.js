var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})
router.post('/post',function(req,res){
  var body = '';
  req.on('data',function(chunk){
    body += chunk;
    console.log(body);
  })
  res.send('post');
})
module.exports = router;
