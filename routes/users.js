var express = require('express');
var router = express.Router();
var connection = require('../db/sql');
var user = require('../db/userSql');
var jwt = require('jsonwebtoken');
var multiparty = require('multiparty');
const path = require('path');

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
        if(results.length > 0){
            res.send({
                message: '用户名或手机号已存在',
            })
        }else{
            //用户信息
            let payload =  {tel: params.tel}

            //口令
            let secret = "dacihua"

            //生成token 第一个参数：用户信息   第二个参数：口令    第三个参数过期时间
            let token = jwt.sign(payload, secret)
            
            //要存什么字段
            var addUser = 'insert into user(id,tel,userName,password,token) values(0,?,?,?,?)'

            //要存的字段值
            var addUserParams = [req.body.tel, req.body.userName, req.body.password, token,]
           
            //开始新增
            connection.query(addUser, addUserParams, function(error, results){
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
    if(req.headers.token){
        //获取前端传过来的token
        let token = req.headers.token

        //解析token，解析出来一个手机号和过期时间（时间戳）
        let telToken = jwt.decode(token)

        //实例化图片插件
        var form = new multiparty.Form()

        //上传的图片保存到目录
        form.uploadDir = 'D:\\nginx-1.26.1\\image\\avatar'
        form.parse(req,function(err, fields, files){
            //获取生成的图片路径
            var filePath = files.file[0].path

            //截取生成的图片名称 path.basename()为内置方法
            var fileName = 'http://localhost/avatar/' + path.basename(filePath);

            //往数据库里面存储图片路径
            connection.query(`update user set imgUrl=? where tel=${telToken.tel}`,[fileName], function(error, results){
                let params = {
                    tel: telToken.tel,
                }
                //查询数据库
                connection.query(user.queryAdd(params), function(error, results){
                    res.send({
                        code:200,
                        success: true,
                        data:{
                            imgUrl: results[0].imgUrl
                        },
                        message: '修改成功',
                    })
                })
                
            })
        })
    }else{
        res.send({
            code:301,
            success: true,
            message: '请先登录',
        })
    }
});

//修改用户信息
router.post('/api/updateUser', function (req, res, next) {
    if(req.headers.token){
        //获取前端传过来的token
        let token = req.headers.token

        //获取前端传过来的参数
        let params = {
            userName: req.body.userName,
            tel: req.body.tel,
            password: req.body.password,
            sex: req.body.sex,
            synopsis: req.body.synopsis,
        }
        
        //解析token，解析出来一个手机号和过期时间（时间戳）
        let telToken = jwt.decode(token)

        //往数据库里面存储用户信息
        connection.query(`update user set userName=?,tel=?,password=?,sex=?,synopsis=? where tel=${telToken.tel}`,[params.userName,params.tel,params.password,params.sex,params.synopsis], function(error, results){
            let params = {
                tel: telToken.tel,
            }
            //查询数据库
            connection.query(user.queryAdd(params), function(error, results){
                res.send({
                    code:200,
                    success: true,
                    data:{
                        userName: results[0].userName,
                        tel: results[0].tel,
                        password: results[0].password,
                        sex: results[0].sex,
                        synopsis: results[0].synopsis,
                    },
                    message: '修改成功',
                })
            })
            
        })
    }else{
        res.send({
            code:301,
            success: true,
            message: '请先登录',
        })
    }
    
});

//当完成数据库操作后，可以关闭连接
// connection.end();

module.exports = router;
