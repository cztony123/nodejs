var express = require('express');
var router = express.Router();
var connection = require('../db/sql');
var user = require('../db/userSql');

/* 登录 */
router.post('/api/login', function (req, res, next) {
    //接收前端传过来的值
    let params = {
        userName: req.body.userName,
        password: req.body.password,
    }

    // //查询用户名是否存在
    connection.query(user.queryUser(params), function(error, results){
        console.log(error, "11111")
        console.log(results, '222222')
        if(results != undefined){
            res.send({
                data:{
                    code:200,
                    success: true,
                    message: '登录成功',
                    token: null
                }
            })
        }else{
            res.send({
                data:{
                    code:300,
                    success: false,
                    message: '用户名或密码不正确',
                }
            })
        }
    })
    
    
    // 当完成数据库操作后，可以关闭连接
    connection.end();
});

module.exports = router;
