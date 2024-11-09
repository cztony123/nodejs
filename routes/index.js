var express = require('express');
var router = express.Router();
var connection = require('../db/sql');
var queryList = require('../db/userSql');
var url = require('url');
var moment = require('moment');
const { log } = require('console');

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
            level: req.body.level,
            reality: req.body.reality,
            totalCost: req.body.totalCost,
        }

        //开始修改
        connection.query(`update stockquery set teaName=?,unit=?,level=?,reality=?,totalCost=? where id=${params.id}`,[params.teaName,params.unit,params.level,params.reality,params.totalCost,], function(error, results){
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
router.post('/api/stock/add', function (req, res, next) {
    if(req.headers.token){
        //接收前端传过来的值
        let params = {
            teaName: req.body.teaName,
            unit: req.body.unit,
            level: req.body.level,
            reality: req.body.reality,
            totalCost: req.body.totalCost,
        }

        // 先查询茶品是否存在
        connection.query(queryList.queryStockList(params), function(error, results){
            if(results.length > 0){
                res.send({
                    code:200,
                    success: true,
                    message: '茶品已存在',
                })
            }else{
                //要存什么字段
                var addStock = 'insert into stockquery(id,teaName,unit,level,reality,totalCost) values(0,?,?,?,?,?)'

                //要存的字段值
                var addStockParams = [req.body.teaName, req.body.unit, req.body.level, req.body.reality, req.body.totalCost]
            
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
    }else{
        res.send({
            code:301,
            success: true,
            message: 'token验证失败',
        })
    }
});


/* 删除库存 */
router.post('/api/stock/del', function (req, res, next) {
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

/* 游戏名称下拉 */
router.get('/api/gameManage/list', function (req, res, next) {
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
                name: "斗地主",
            },
            {
                id: "2",
                name: "消消乐",
            },
            {
                id: "3",
                name: "刺客信条",
            },
            {
                id: "4",
                name: "王者荣耀",
            },
            {
                id: "5",
                name: "保卫萝卜",
            },
            {
                id: "6",
                name: "梦幻花园",
            },
        ],
        message: '请求成功',
    })
});

/* 游戏数据列表 */
router.get('/api/game/data', function (req, res, next) {
    let params = {
        gameName: req.query.gameName, //游戏名称
        gameRoomId: req.query.gameRoomId, //牌局编号
        startTime: req.query.startTime, //开始时间
        endTime: req.query.endTime, //结束时间
        pageNum: req.query.pageNum, //第几页
        pageSize: req.query.pageSize, //每页条数
    }

    let str = ``
    if(params.orderNum){
        str += `orderNum='${params.orderNum}' and `
    }

    if(params.userId){
        str += `userId='${params.userId}' and `
    }

    if(params.depositType){
        str += `depositType='${params.depositType}' and `
    }

    const sql = `select * from gamedata where ${str}startTime between '${params.startTime}' and '${params.endTime}'`;

    connection.query(sql, function(error, results){
        results.forEach( item => {
            item.startTime = moment(item.startTime).format("YYYY-MM-DD HH:mm:ss")
            item.endTime = moment(item.endTime).format("YYYY-MM-DD HH:mm:ss")
        });
        
        if(results.length > 0){
            res.send({
                code:200,
                success: true,
                result: results,
                total: results.length,
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


//修改状态
router.post('/api/game/edit', function (req, res, next) {
    if(req.headers.token){
        //获取前端传过来的参数
        let params = {
            userId: req.body.userId, //会员ID
            state: req.body.state, //状态
        }

        //开始修改
        connection.query(`update gamedata set state=? where userId=${params.userId}`,[params.state], function(error, results){
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
            message: '修改成功',
        })
    }
    
});


/* 游戏详情列表 */
router.get('/api/game/details', function (req, res, next) {
    let params = {
        curr_inning: req.query.curr_inning, //当前局
        userId: req.query.userId, //牌局编号
    }

    //初始数据 3局
    var detailsList = [
        {
            list: [
                {
                    userId: '56482',
                    curr_inning: 1, //当前局
                    total_inning: 3, //当前局
                    peopleNumber: '3/3', //参与人数
                    integral: '6', //积分
                    winnerNum: '6', //赢家输赢
                    otherNum: '-6', //其他玩家输赢
                    userName: '大呲花', //玩家昵称
                    startTime: '2024-10-24 00:42:36', //开始时间
                    endTime: '2024-10-24 01:13:25', //结束时间
                },
            ],
            overList: [
                {
                    userId: '56482', //会员id
                    userName: '大呲花', //会员昵称
                    avatar: 'http://localhost/avatar/YSR7kx1qiwpoXqj8areerEZ4.jpg', //头像
                    winnerNum: '6', //玩家输赢
                    finalNum: '6', //最终输赢
                    integral: '6', //积分
                    cardType: [0,1,2,3,4,5,6,7,8,9,20,21,22,25,31,37,38,45,47,53],
                    overCardType:[0,1,2,3,4,5,6,7,8,9,20,21,22,25,31,37,38,45,47,53],
                    result: 0//结果(0-赢家，1-输家)
                },
                {
                    userId: '64259', //会员id
                    userName: '大呲花', //会员昵称
                    avatar: 'http://localhost/avatar/RXdfSDzz-yaTQClgLSForazg.jpg', //头像
                    winnerNum: '-3', //玩家输赢
                    finalNum: '-3', //最终输赢
                    integral: '-3', //积分
                    cardType: [2,3,10,11,14,15,18,19,22,28,36,44,45,46,47,48,49],
                    overCardType:[14,15,18,19,44,45],
                    result: 1//结果(0-赢家，1-输家)
                },
                {
                    userId: '31965', //会员id
                    userName: '大呲花', //会员昵称
                    avatar: 'http://localhost/avatar/NbGD7U2kowi731PlGkBEC6y1.jpg', //头像
                    winnerNum: '-3', //玩家输赢
                    finalNum: '-3', //最终输赢
                    integral: '-3', //积分
                    cardType: [2,3,10,11,14,15,18,19,22,28,36,44,45,46,47,48,49], //牌型
                    overCardType:[2,3,8,9,18,19,36,44,49], //已出牌型
                    result: 1//结果(0-赢家，1-输家)
                },
            ]
        },
        {
            list: [
                {
                    userId: '56482',
                    curr_inning: 2, //当前局
                    total_inning: 3, //当前局
                    peopleNumber: '3/3', //参与人数
                    integral: '12', //积分
                    winnerNum: '12', //赢家输赢
                    otherNum: '12', //其他玩家输赢
                    userName: '大呲花', //玩家昵称
                    startTime: '2024-10-24 00:42:36', //开始时间
                    endTime: '2024-10-24 01:13:25', //结束时间
                },
            ],
            overList: [
                {
                    userId: '56482', //会员id
                    userName: '大呲花', //会员昵称
                    avatar: 'http://localhost/avatar/YSR7kx1qiwpoXqj8areerEZ4.jpg', //头像
                    winnerNum: '12', //玩家输赢
                    finalNum: '12', //最终输赢
                    integral: '12', //积分
                    cardType: [1,2,3,4,5,6,7,8,9],
                    overCardType:[2,4,7,9],
                    result: 0//结果(0-赢家，1-输家)
                },
                {
                    userId: '64259', //会员id
                    userName: '大呲花', //会员昵称
                    avatar: 'http://localhost/avatar/RXdfSDzz-yaTQClgLSForazg.jpg', //头像
                    winnerNum: '-6', //玩家输赢
                    finalNum: '-6', //最终输赢
                    integral: '-6', //积分
                    cardType: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
                    overCardType:[2,4,7,9],
                    result: 1//结果(0-赢家，1-输家)
                },
                {
                    userId: '31965', //会员id
                    userName: '大呲花', //会员昵称
                    avatar: 'http://localhost/avatar/NbGD7U2kowi731PlGkBEC6y1.jpg', //头像
                    winnerNum: '-6', //玩家输赢
                    finalNum: '-6', //最终输赢
                    integral: '-6', //积分
                    cardType: [1,2,3,4,5,6,7,8,9], //牌型
                    overCardType:[2,4,7,9], //已出牌型
                    result: 1//结果(0-赢家，1-输家)
                },
            ]
        },
        {
            list: [
                {
                    userId: '56482',
                    curr_inning: 3, //当前局
                    total_inning: 3, //当前局
                    peopleNumber: '3/3', //参与人数
                    integral: '24', //积分
                    winnerNum: '24', //赢家输赢
                    otherNum: '24', //其他玩家输赢
                    userName: '大呲花', //玩家昵称
                    startTime: '2024-10-24 00:42:36', //开始时间
                    endTime: '2024-10-24 01:13:25', //结束时间
                },
            ],
            overList: [
                {
                    userId: '56482', //会员id
                    userName: '大呲花', //会员昵称
                    avatar: 'http://localhost/avatar/YSR7kx1qiwpoXqj8areerEZ4.jpg', //头像
                    winnerNum: '24', //玩家输赢
                    finalNum: '24', //最终输赢
                    integral: '24', //积分
                    cardType: [1,2,3,4,5,6,7,8,9],
                    overCardType:[2,4,7,9],
                    result: 0//结果(0-赢家，1-输家)
                },
                {
                    userId: '64259', //会员id
                    userName: '大呲花', //会员昵称
                    avatar: 'http://localhost/avatar/RXdfSDzz-yaTQClgLSForazg.jpg', //头像
                    winnerNum: '-12', //玩家输赢
                    finalNum: '-12', //最终输赢
                    integral: '-12', //积分
                    cardType: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
                    overCardType:[2,4,7,9],
                    result: 1//结果(0-赢家，1-输家)
                },
                {
                    userId: '31965', //会员id
                    userName: '大呲花', //会员昵称
                    avatar: 'http://localhost/avatar/NbGD7U2kowi731PlGkBEC6y1.jpg', //头像
                    winnerNum: '-12', //玩家输赢
                    finalNum: '-12', //最终输赢
                    integral: '-12', //积分
                    cardType: [1,2,3,4,5,6,7,8,9], //牌型
                    overCardType:[2,4,7,9], //已出牌型
                    result: 1//结果(0-赢家，1-输家)
                },
            ]
        }
    ]

    let result = []
    detailsList.forEach(item =>{
        for(var i = 0; i < item.list.length; i++){
            if(item.list[i].curr_inning == params.curr_inning){
                result = item
            }
        } 
    })

    
    if(params.userId){
        let ress = result.overList.filter(item => item.userId == params.userId)
        result.overList = ress
    }
    

    res.send({
        code:200,
        success: true,
        result: result,
        message: '请求成功',
    })
});

module.exports = router;
