var express = require('express');
var router = express.Router();

/* 登录 */
router.get('/api/login', function (req, res, next) {
    console.log('222222')
    console.log(req)
    res.json({
        id: 1,
        name: '张三',
        password: 123456
    });
});

/* 轮播图 */
router.get('/api/swipe/list', function (req, res, next) {
    res.send({
        code:200,
        data:{
            topBar:[
                "../public/images/lunbo1.jpg",
                "../public/images/lunbo2.jpg",
                "http://localhost:8081/api/lunbo1.jpg",
            ]
        }
    });
});

/* tabBar */
router.get('/api/babbar/list', function (req, res, next) {
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

/* 列表第一页第一屏 */
router.get('/api/home/0/list/1', function (req, res, next) {
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
                {
                    url:'https://image.maimn.com/cover/26317dce2f9d6ed627386f34400be2ec.jpg',
                    videoName: '金手指 国语版'
                },
                {
                    url:'https://image11.m1905.cn/mdb/uploadfile/2024/0313/thumb_1_283_390_20240313120338498959.jpg',
                    videoName: '死神来了'
                },
                {
                    url:'https://image11.m1905.cn/mdb/uploadfile/2024/0313/thumb_1_283_390_20240313120338498959.jpg',
                    videoName: '草木人间'
                },
                {
                    url:'https://image.maimn.com/cover/230fd6d29005cc05d3586a611cb25131.jpg',
                    videoName: '猩球崛起：新世界'
                },
                {
                    url:'https://image.maimn.com/cover/26317dce2f9d6ed627386f34400be2ec.jpg',
                    videoName: '金手指 国语版'
                },
                {
                    url:'https://image11.m1905.cn/mdb/uploadfile/2024/0313/thumb_1_283_390_20240313120338498959.jpg',
                    videoName: '死神来了'
                },
                {
                    url:'https://image11.m1905.cn/mdb/uploadfile/2024/0313/thumb_1_283_390_20240313120338498959.jpg',
                    videoName: '草木人间'
                },
                {
                    url:'https://image.maimn.com/cover/230fd6d29005cc05d3586a611cb25131.jpg',
                    videoName: '猩球崛起：新世界'
                },
                {
                    url:'https://image.maimn.com/cover/26317dce2f9d6ed627386f34400be2ec.jpg',
                    videoName: '金手指 国语版'
                },
                {
                    url:'https://image11.m1905.cn/mdb/uploadfile/2024/0313/thumb_1_283_390_20240313120338498959.jpg',
                    videoName: '死神来了'
                },
                {
                    url:'https://image11.m1905.cn/mdb/uploadfile/2024/0313/thumb_1_283_390_20240313120338498959.jpg',
                    videoName: '草木人间'
                },
                {
                    url:'https://image.maimn.com/cover/230fd6d29005cc05d3586a611cb25131.jpg',
                    videoName: '猩球崛起：新世界'
                },
                {
                    url:'https://image.maimn.com/cover/26317dce2f9d6ed627386f34400be2ec.jpg',
                    videoName: '金手指 国语版'
                },
                {
                    url:'https://image11.m1905.cn/mdb/uploadfile/2024/0313/thumb_1_283_390_20240313120338498959.jpg',
                    videoName: '死神来了'
                },
                {
                    url:'https://image11.m1905.cn/mdb/uploadfile/2024/0313/thumb_1_283_390_20240313120338498959.jpg',
                    videoName: '草木人间'
                },
                {
                    url:'https://image.maimn.com/cover/230fd6d29005cc05d3586a611cb25131.jpg',
                    videoName: '猩球崛起：新世界'
                },
                {
                    url:'https://image.maimn.com/cover/26317dce2f9d6ed627386f34400be2ec.jpg',
                    videoName: '金手指 国语版'
                },
                {
                    url:'https://image11.m1905.cn/mdb/uploadfile/2024/0313/thumb_1_283_390_20240313120338498959.jpg',
                    videoName: '死神来了'
                },
                {
                    url:'https://image11.m1905.cn/mdb/uploadfile/2024/0313/thumb_1_283_390_20240313120338498959.jpg',
                    videoName: '草木人间'
                },
                {
                    url:'https://image.maimn.com/cover/230fd6d29005cc05d3586a611cb25131.jpg',
                    videoName: '猩球崛起：新世界'
                },
                {
                    url:'https://image.maimn.com/cover/26317dce2f9d6ed627386f34400be2ec.jpg',
                    videoName: '金手指 国语版'
                },
                {
                    url:'https://image11.m1905.cn/mdb/uploadfile/2024/0313/thumb_1_283_390_20240313120338498959.jpg',
                    videoName: '死神来了'
                },
                {
                    url:'https://image11.m1905.cn/mdb/uploadfile/2024/0313/thumb_1_283_390_20240313120338498959.jpg',
                    videoName: '草木人间'
                },
                {
                    url:'https://image.maimn.com/cover/230fd6d29005cc05d3586a611cb25131.jpg',
                    videoName: '猩球崛起：新世界'
                },
                {
                    url:'https://image.maimn.com/cover/26317dce2f9d6ed627386f34400be2ec.jpg',
                    videoName: '金手指 国语版'
                },
                {
                    url:'https://image11.m1905.cn/mdb/uploadfile/2024/0313/thumb_1_283_390_20240313120338498959.jpg',
                    videoName: '死神来了'
                },
            ]
        }
    });
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

module.exports = router;
