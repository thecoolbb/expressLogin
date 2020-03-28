var mysql = require('../public/javascripts/config/mysql/mysql')
var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var body = {
    code: null,
    msg: ''
}
/* GET home page. */
const connect = mysql.connect();
router.post('/', function (req, res, next) {
    let data = '';
    try {
            mysql.selectFun(connect, req.body.username, function (results) {
                body.code = 0;
                if(results.length>0)
                {
                    body.checkRegister = false;
                    body.msg = '用户名已存在';
                    return body;
                }else{
                    var token = jwt.sign(req.body.username, new Date().getTime().toString());
                    mysql.insertFun(connect, req.body.username, req.body.password,token, function (results) {
                        body.msg = results;
                        body.code = -1;
                        return body;
                    })
                    body.token = token;
                    body.msg = '注册成功';
                    body.checkRegister = true;
                }
            })
        } catch (error) {
            body.msg = error;
            body.code = -1;
            console.log(body, 38);
            return body;
        }
        res.send(body);
});

module.exports = router;