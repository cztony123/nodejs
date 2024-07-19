//验证数据库中的用户
const User = {
    //查询手机号、用户名、密码
    queryUser(params){
        var sql = "select * from user where (tel = '"+params.tel+"' or userName = '"+params.userName+"') and password = '"+params.password + "'";
        return sql;
    },

    //注册
    queryAdd(params){
        var sql = "select * from user where (userName = '"+params.userName+"') or tel = '"+params.tel + "'";
        return sql;
    },
    inserUser(params){
        //引入token包
        let jwt = require('jsonwebtoken');

        //用户信息
        let payload =  {tel: params.tel}

        //口令
        let secret = "dacihua"

        //生成token 第一个参数：用户信息   第二个参数：口令    第三个参数过期时间
        let token = jwt.sign(payload, secret)
        return "insert into user (tel, userName, password, imgUrl, sex, token) values ('"+params.tel+"','"+params.userName+"','"+params.password+"','','','"+token+"')"
    }
}

exports = module.exports = User;