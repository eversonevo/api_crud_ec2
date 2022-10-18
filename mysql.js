const mysql = require('mysql2');

// variaveis de ambiente
var pool = mysql.createPool({
    "connectionLimit": 1000,
    "user": process.env.MYSQL_USER || "root",
    "password": process.env.MYSQL_PASSWORD || "root",
    "database": process.env.MYSQL_DATABASE || "ecommerce",
    "host": process.env.MYSQL_HOST || "localhost",
    "port": process.env.MYSQL_PORT || 3306,
});

/*var pool = mysql.createPool({
    "connectionLimit": 1000,
    "user": "u903973099_api_teste_bd",
    "password": "api_teste_BD_2021",
    "database": "u903973099_api_teste_bd",
    "host": "185.211.7.205",
    "port": 3306,
});*/
exports.execute = (query, params=[])=>{
    return new Promise((resolve, reject)=>{
                pool.query(query, params, (error, result, fields)=>{
                    if (error) {
                        reject(error);                        
                    }else{
                        resolve(result);
                    }
                });
        })
   
}

exports.pool = pool;