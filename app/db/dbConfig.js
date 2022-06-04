const mysql = require('mysql')
require('dotenv').config();
var config = {
    //     //user:process.env.USER, 
    //     //database:process.env.DATABASE,
    //     //dbdriver:process.env.DBDIRVER   
    //     // password:process.env.PASSWORD,
    host: "localhost",
    user: "root",
    password: "",
    database: "testproject",
    dbdriver: "mysqli"
}

var conn = mysql.createConnection(config)
conn.connect(function (err) {
    if (err) throw err
})
module.exports = conn