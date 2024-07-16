const mysql = require('mysql');

// 设置数据库连接参数
const connection = mysql.createConnection({
    host:'localhost', // 数据库服务器地址
    user:'root', // 数据库用户名
    password:'123456', // 数据库密码
    database:'myvideo' // 要连接的数据库名
});
   
// 开始连接
connection.connect();

// 执行查询
// connection.query('select * from user', (error, results, fields) => {
//     if (error) throw error;
//     // 处理查询结果
//     console.log(results);
// });
   


module.exports = connection;

