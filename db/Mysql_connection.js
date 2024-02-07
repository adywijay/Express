const mysql = require('mysql');

const previlege = {
    host: 'localhost',
    port: 3408,
    user: 'root',
    password: '',
    database: 'expresscrud'
};

const db_mysql = mysql.createConnection(previlege);
db_mysql.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    } else {
        console.log('Ok.! ....Connected to Mysql ');
    }
});


module.exports = { db_mysql};