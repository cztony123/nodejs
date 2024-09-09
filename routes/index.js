var express = require('express');
var router = express.Router();
var connection = require('../db/sql');
var queryList = require('../db/userSql');
var url = require('url');
var moment = require('moment');

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

/* 会员充值下拉 */
router.get('/api/depositOrder/list', function (req, res, next) {
    res.send({
        code:200,
        success: true,
        data: [
            {
                id: "",
                name: "全部",
            },
            {
                id: "1",
                name: "支付宝",
            },
            {
                id: "2",
                name: "微信",
            },
            {
                id: "3",
                name: "银行卡",
            },
            {
                id: "4",
                name: "分期",
            },
            {
                id: "5",
                name: "积分兑换",
            },
        ],
        message: '请求成功',
    })
});


/* 会员充值列表 */
router.get('/api/depositOrder/data', function (req, res, next) {
    //查询depositorder表
    let params = {
        orderNum: req.query.orderNum, //订单号
        userId: req.query.userId, //会员ID
        depositType: req.query.depositType, //类型
        startTime: req.query.startTime,
        endTime: req.query.endTime,
        pageNum: (req.query.pageNum-1)*req.query.pageSize,
        pageSize: req.query.pageSize
    }

    var total = 0
    connection.query(queryList.queryOrderTotal(params), function(error, results){
        total = results.length
    })
    

    connection.query(queryList.queryOrderList(params), function(error, results){
        results.forEach( item => {
            item.dateTime = moment(item.dateTime).format("YYYY-MM-DD HH:mm:ss")
        });
        
        if(results.length > 0){
            res.send({
                code:200,
                success: true,
                data: results,
                total: total,
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



/* 库存查询 */
router.get('/api/stock/data', function (req, res, next) {
    let params = {
        teaName: req.query.teaName, //茶品名称
    }
    
    var total = 0
    connection.query(queryList.queryStockList(params), function(error, results){
        total = results.length
    })
    

    connection.query(queryList.queryStockList(params), function(error, results){
        if(results.length > 0){
            res.send({
                code:200,
                success: true,
                data: results,
                total: total,
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


//修改库存
router.post('/api/stock/edit', function (req, res, next) {
    if(req.headers.token){
        //获取前端传过来的参数
        let params = {
            id: req.body.id,
            teaName: req.body.teaName,
            unit: req.body.unit,
            rating: req.body.rating,
            reality: req.body.reality,
            totalCost: req.body.totalCost,
        }

        //开始修改
        connection.query(`update stockquery set teaName=?,unit=?,rating=?,reality=?,totalCost=? where id=${params.id}`,[params.teaName,params.unit,params.rating,params.reality,params.totalCost,], function(error, results){
            res.send({
                code:200,
                success: true,
                message: '修改成功',
            })
        })
    }else{
        res.send({
            code:301,
            success: true,
            message: 'token验证失败',
        })
    }
    
});


/* 新增库存 */
router.post('/api/addStock', function (req, res, next) {
    //接收前端传过来的值
    let params = {
        teaName: req.body.teaName,
        unit: req.body.unit,
        rating: req.body.rating,
        reality: req.body.reality,
        totalCost: req.body.totalCost,
    }

    // 先查询茶品是否存在
    connection.query(queryList.queryStockList(params), function(error, results){
        if(results.length > 0){
            res.send({
                message: '茶品已存在',
            })
        }else{
            //要存什么字段
            var addStock = 'insert into stockquery(id,teaName,unit,rating,reality,totalCost) values(0,?,?,?,?,?)'

            //要存的字段值
            var addStockParams = [req.body.teaName, req.body.unit, req.body.rating, req.body.reality, req.body.totalCost]
           
            //开始新增
            connection.query(addStock, addStockParams, function(error, results){
                res.send({
                    code:200,
                    success: true,
                    message: '添加成功',
                })
            })
        }
    })
});


/* 删除库存 */
router.post('/api/delStock', function (req, res, next) {
    //接收前端传过来的值
    let params = {
        id: req.body.id,
    }

    //要存什么字段
    var delSql = `delete from stockquery where id=${params.id}`

    //开始删除
    connection.query(delSql, function(error, results){
        res.send({
            code:200,
            success: true,
            message: '删除成功',
        })
    })
});
module.exports = router;
