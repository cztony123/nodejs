//验证数据库中的用户
const User = {
    //查询手机号、用户名、密码
    queryUser(params){
        var sql = "select * from user where (tel = '"+params.userName+"' or userName = '"+params.userName+"') and password = '"+params.password + "'";
        return sql;
    },

    //注册
    inserUser(params){
        return "insert into user (tel, userName, password, imgUrl, sex, token) values ('','','','','','')"
    }
}

exports = module.exports = User;