var express = require('express');
var router = express.Router();
var connection = require('../db/sql');
var queryList = require('../db/userSql');
var url = require('url');

/* 轮播图 */
router.get('/api/swipe/list', function (req, res, next) {
    //查询swiper表 全部
    connection.query('select * from swiper', function(error, results){
        if(results.length > 0){
            res.send({
                code:200,
                success: true,
                data: results,
                message: '请求成功',
            })
        }else{
            res.send({
                code:300,
                success: false,
                message: '暂无数据',
            })
        }
    })
});

/* tabBar */
router.get('/api/tabbar/list', function (req, res, next) {
    res.send({
        code:200,
        data:{
            topBar:[
                {
                    id: 0,
                    label: "全部电影"
                },
                {
                    id: 1,
                    label: "惊悚"
                },
                {
                    id: 2,
                    label: "恐怖"
                },
                {
                    id: 3,
                    label: "悬疑"
                },
                {
                    id: 4,
                    label: "灾难"
                },
                {
                    id: 5,
                    label: "科幻"
                },
                {
                    id: 6,
                    label: "奇幻"
                },
                {
                    id: 7,
                    label: "动漫"
                },
            ]
        }
    });
});

/* 列表 */
router.get('/api/home/list', function (req, res, next) {
    //查询homeList表
    let params = {
        title: req.query.title,
        language: '',
        yearEra: '',
        pageNum: (req.query.pageNum-1)*req.query.pageSize,
        pageSize: req.query.pageSize
    }
    

    connection.query(queryList.queryHomeList(params), function(error, results){
        if(results.length > 0){
            res.send({
                code:200,
                success: true,
                data: results,
                message: '请求成功',
            })
        }else{
            res.send({
                code:300,
                success: false,
                message: '暂无数据',
            })
        }
    })
});

/* 列表第二页第一屏 */
router.get('/api/home/1/list/1', function (req, res, next) {
    res.send({
        code:200,
        data:{
            videoList:[
                {
                    url:'https://image11.m1905.cn/mdb/uploadfile/2024/0313/thumb_1_283_390_20240313120338498959.jpg',
                    videoName: '草木人间'
                },
                {
                    url:'https://image.maimn.com/cover/230fd6d29005cc05d3586a611cb25131.jpg',
                    videoName: '猩球崛起：新世界'
                },
            ]
        }
    });
});





/* 首页 */
router.get('/api/home', function (req, res, next) {
    let params = {
        startTime: req.query.startTime,
        endTime: req.query.endTime,
    }


    var teaData = {
        stock:[],
        funds:[
            {
                title: '铁观音',
                moneyNum: 0
            },
            {
                title: '西湖龙井',
                moneyNum: 0
            },
            {
                title: '菊花茶',
                moneyNum: 0
            },
            {
                title: '大红袍',
                moneyNum: 0
            }
        ],
        userstate:[]
    }

    
    //查库存
    connection.query('select * from stock', function(error, results){
        teaData.stock = results
        
    })

    //查铁观音金额
    connection.query(`select * from tieguanyin where dateTime between '${params.startTime}' and '${params.endTime}'`, function(error, results){
        if(results.length > 0){
            for(var i = 0; i < results.length; i++){
                teaData.funds[0].moneyNum += results[i].moneyNum
            }
        }
    })

    //查龙井金额
    connection.query(`select * from longjing where dateTime between '${params.startTime}' and '${params.endTime}'`, function(error, results){
        if(results.length > 0){
            for(var i = 0; i < results.length; i++){
                teaData.funds[1].moneyNum += results[i].moneyNum
            }
        }
    })

    //查菊花茶金额
    connection.query(`select * from juhuacha where dateTime between '${params.startTime}' and '${params.endTime}'`, function(error, results){
        if(results.length > 0){
            for(var i = 0; i < results.length; i++){
                teaData.funds[2].moneyNum += results[i].moneyNum
            }
        }
    })

    //查大红袍金额
    connection.query(`select * from dahongpao where dateTime between '${params.startTime}' and '${params.endTime}'`, function(error, results){
        if(results.length > 0){
            for(var i = 0; i < results.length; i++){
                teaData.funds[3].moneyNum += results[i].moneyNum
            }
        }
    })

    //查用户
    connection.query('select * from userstate', function(error, results){
        teaData.userstate = results
    })
    

    setTimeout(function(){
        res.send({
        code:200,
        success: true,
        data: teaData,
        message: '请求成功',
    })},500);
    
});

module.exports = router;
