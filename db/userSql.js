//验证数据库中的用户
const User = {
    //查询手机号、用户名、密码
    queryUser(params){
        var sql = "select * from user where (tel = '"+params.tel+"' or userName = '"+params.userName+"') and password = '"+params.password + "'";
        return sql;
    },

    //注册时先查询
    queryAdd(params){
        //先查询用户名或手机号存不存在
        var sql = "select * from user where (userName = '"+params.userName+"') or tel = '"+params.tel + "'";
        return sql;
    },

    

    //修改头像
    editUser(params){
        //update: 更新，  user：表名，  set imgUrl: 要改哪些,  where tel:代表要改谁，   []:代表要改成什么
        var sql = "update user set imgUrl=? where tel='"+params.tel+"', '"+[params.imgUrl]+"'";
        return sql;
    }
}

exports = module.exports = User;