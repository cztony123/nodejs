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
    },


    //列表多条件模糊查询
    queryHomeList(params){
        let req = ``
        if(params.title){
            req += `where title like '%${params.title}%' `
        }

        if(params.yearEra){
            if(req){
                req += `and yearEra like '%${params.yearEra}%' `
            }else{
                req += `where yearEra like '%${params.yearEra}%' `
            }
        }

        if(params.language){
            if(req){
                req += `and language like '%${params.language}%' `
            }else{
                req += `where language like '%${params.language}%' `
            }
        }

        const sql =  `select * from homelist ${req}limit ${params.pageNum},${params.pageSize}`;
        return sql;
    },


    //财务管理多条件模糊查询总数
    queryOrderTotal(params){
        let req = ``
        if(params.orderNum){
            req += `orderNum='${params.orderNum}' and `
        }

        if(params.userId){
            req += `userId='${params.userId}' and `
        }

        if(params.depositType){
            req += `depositType='${params.depositType}' and `
        }

        const sql =  `select * from depositorder where ${req}dateTime between '${params.startTime}' and '${params.endTime}'`;
        console.log(sql)
        return sql;
    },

    //财务管理多条件模糊查询
    queryOrderList(params){
        let req = ``
        if(params.orderNum){
            req += `orderNum='${params.orderNum}' and `
        }

        if(params.userId){
            req += `userId='${params.userId}' and `
        }

        if(params.depositType){
            req += `depositType='${params.depositType}' and `
        }

        const sql =  `select * from depositorder where ${req}dateTime between '${params.startTime}' and '${params.endTime}' limit ${params.pageNum},${params.pageSize}`;
        console.log(sql)
        return sql;
    },


    //库存查询-数据
    queryStockList(params){
        let req = ``
        if(params.teaName){
            req += `where teaName='${params.teaName}'`
        }

        const sql =  `select * from stockquery ${req}`;
        console.log(sql)
        return sql;
    },
}

exports = module.exports = User;