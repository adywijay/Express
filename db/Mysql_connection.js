const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3408,
    user: 'root',
    password: '',
    database: 'expresscrud'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    } else {
        console.log('Ok.! ....Connected to Mysql ');
    }
});

module.exports = connection;