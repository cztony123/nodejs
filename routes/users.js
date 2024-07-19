var express = require('express');
var router = express.Router();
var connection = require('../db/sql');
var user = require('../db/userSql');
var jwt = require('jsonwebtoken');
var multiparty = require('multiparty');

/* 登录 */
router.post('/api/login', function (req, res, next) {
    //接收前端传过来的值
    let params = {
        userName: req.body.userName,
        password: req.body.password,
    }

    // //查询用户名是否存在
    connection.query(user.queryUser(params), function(error, results){
        if(results.length > 0){
            res.send({
                code:200,
                success: true,
                data: results[0],
                message: '登录成功',
            })
        }else{
            res.send({
                code:300,
                success: false,
                message: '用户名或密码不正确',
            })
        }
    })
});


/* 注册 */
router.post('/api/addUser', function (req, res, next) {
    //接收前端传过来的值
    let params = {
        userName: req.body.userName,
        tel: req.body.tel,
    }

    // 先查询用户名或手机号是否存在
    connection.query(user.queryAdd(params), function(error, results){
        console.log(results, '00000')
        if(results.length > 0){
            res.send({
                message: '用户名或手机号已存在',
            })
        }else{
            //新增用户
            connection.query(user.inserUser(req.body), function(error, results){
                //查询是否新增成功
                connection.query(user.queryAdd(params), function(error, results){
                    if(results.length > 0){
                        res.send({
                            code:200,
                            success: true,
                            message: '注册成功',
                        })
                    }else{
                        res.send({
                            message: '注册失败',
                        })
                    }
                })
            })
        }
    })
});

//图片上传
router.post('/api/uploadAvatar', function (req, res, next) {
    //实例化
    var form = new multiparty.Form()

    //上传的图片保存到目录
    form.uploadDir = './public/avatar'
    form.parse(req,function(err, fields, files){
        //获取生成的图片路径
        var pic = files.file[0].path
    })
});


//修改头像
// router.get('/api/collect', function (req, res, next) {
//     //获取前端穿啊过来的token
//     let token = req.headers.token

//     //解析token，解析出来一个手机号和过期时间（时间戳）
//     let tel = jwt.decode(token)
//     console.log(tel, '6666666')
//     res.send({
//         code:200,
//         data:{
//             a:1
//         }
//     });
// });


//当完成数据库操作后，可以关闭连接
// connection.end();

module.exports = router;
