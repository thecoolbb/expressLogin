var mysql = require('../public/javascripts/config/mysql/mysql')
var express = require('express');
var router = express.Router();
var body = {
    code: null,
    msg: ''
}
/* GET home page. */
const connect = mysql.connect();
router.post('/', function (req, res, next) {
    var data = '';
    try {
        mysql.selectFun(connect, req.body.username, function (results) {
            body.code = 0;
            body.checkCurrent = false;
            if (results.length > 0 && results[0].password === req.body.password) {
                body.checkCurrent = true;
                body.msg = '登陆成功';
                body.token = results[0].token;
                res.send(body);
                return body;
            } else if (results.length > 0) {
                body.msg = '密码错误';
                res.send(body);
                return body;
            } else {
                body.msg = '用户名不存在';
                res.send(body);
                return body;
            }
        })
    } catch (error) {
        body.msg = error;
        body.code = -1;
        res.send(body);
        return body;
    }
});

module.exports = router;