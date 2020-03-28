var Mysql = require('mysql')
var mysql = {
    host: '127.0.0.1',
    user: 'root',
    password: 'a123456',
    database: 'user_information'
}
function connectServer(){
    var client = Mysql.createConnection(mysql)
    return client;
}
function selectFun(client,username,callback){
    client.query('select password,token from login where username="' + username + '"',function(err,results){
        if(err) throw err;
        callback(results);
    });
}
function insertFun(client,username,password,token,callback){
    client.query('insert into login value(?,?,?)',[username,password,token],function(err,result){
        if(err){
            console.log("error:" + err.message);
            return err;
        }
        callback(err);
    })
}
function insertPosition(client,username,position,callback){
     client.query('insert into position value(?,?)', [username, position], function (err, result) {
         if (err) {
             console.log("error:" + err.message);
             return err;
         }
         callback(err);
     })
}
function selectPosition(client, username, callback) {
    client.query('select position from position where username="' + username + '"', function (err, results) {
        if (err) throw err;
        callback(results);
    });
}
exports.connect = connectServer;
exports.selectFun = selectFun;
exports.insertFun = insertFun;
exports.insertPosition = insertPosition;
exports.selectPosition = selectPosition;

