/**
 * ==============================================================================+
 *                                                                               |
 *                         Call Modul or Config Library                          |
 *                                                                               |
 * ==============================================================================+
 */
const express = require('express');
const db_mysql = require('./db/Mysql_connection');;
const csrf = require('csurf');
const path = require('path');
const ejs = require('ejs');
const app = express();
const port = 8080;
const cookieParser = require('cookie-parser');
var csrfProtection = csrf({ cookie: true });
var validator = require('validator');
var bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');




/**
 * ==============================================================================+
 *                                                                               |
 *                          Use Modul or Config Library                          |
 *                                                                               |
 * ==============================================================================+
 */
app.use(express.static(path.join(__dirname, 'public')));
//------------------------------ Start initials static asset file ----------------
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/plugins", express.static(__dirname + "public/plugins"));
app.use("/images", express.static(__dirname + "public/images"));
//------------------------------ End initials static asset file ------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout extractScripts', true) //Enabling to reand and load js file
//app.set('layout', 'layout/master_page'); Set default parent page




/**
 * ==============================================================================+
 *                                                                               |
 *                          Config Routing or Function Logic                     |
 *                                                                               |
 * ==============================================================================+
 */

app.get('/', csrfProtection, (req, res) => {
    res.render('pages_dynamics/tes', {
        csrfToken: req.csrfToken(),
        layout: 'layout/master_page',
        judul: 'Welcome'
    });
});

app.get('/view_add_data', csrfProtection, (req, res) => {

    res.render('pages_dynamics/view_insert', {
        csrfToken: req.csrfToken(),
        layout: 'layout/master_page',
        judul: 'View | Insert Page'
    })

    /**
        let prepare_query = `SELECT * FROM biodata`;
        db_mysql.query(prepare_query, (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.render('pages_dynamics/view_insert', {
                    csrfToken: req.csrfToken(),
                    layout: 'layout/master_page',
                    judul: 'View | Insert Page',
                    error: true,
                    messages: "Ada masalah koneksi Nodejs ke Mysql"
                });
            } else {

                console.log(results);

                return res.render('pages_dynamics/view_insert', {
                    csrfToken: req.csrfToken(),
                    layout: 'layout/master_page',
                    judul: 'View | Insert Page',
                    error: false,
                    data: results
                });
            }
        });
    */
});

app.post('/do_action_save', csrfProtection, (req, res) => {

    let collect_data = {
        nama_lengkap: req.body.nama_lengkap,
        alamat: req.body.alamat,
        kelas: req.body.kelas
    };

    let prepare_query = 'INSERT INTO biodata SET ?';

    db_mysql.query(prepare_query, collect_data, (err, result) => {
        if (err) {
            console.log(err);
        }

        let info = {
            row_inserted: result.affectedRows,
            last_row_id_inserted: result.insertId
        };
        console.info(info);
        return res.json({
            status: true,
            code: 200,
            msg: 'Data has been successfully added'
        });
    });
});

app.get('/view_retrive_data', csrfProtection, (req, res) => {


    let prepare_query = `SELECT * FROM biodata`;
    db_mysql.query(prepare_query, (error, results, fields) => {
        if (error) {
            console.log(error);
            // res.render('pages_dynamics/view_retrive', {
            //     csrfToken: req.csrfToken(),
            //     layout: 'layout/master_page',
            //     judul: 'View | Insert Page'
            // })
            return res.render('pages_dynamics/view_retrive', {
                csrfToken: req.csrfToken(),
                layout: 'layout/master_page',
                judul: 'View | Insert Page',
                error: true,
                messages: "Ada masalah koneksi Nodejs ke Mysql"
            });
        } else {

            console.table(results);

            return res.render('pages_dynamics/view_retrive', {
                csrfToken: req.csrfToken(),
                layout: 'layout/master_page',
                judul: 'View | Retrive Page',
                error: false,
                data: results
            });
        }
    });

});

app.get('/do_get_by/:id_bio', csrfProtection, (req, res) => {

    let data_form = {
        id_bio: req.params.id_bio
    };

    let prepare_query = 'SELECT * FROM biodata WHERE id_bio = ? LIMIT 1';

    db_mysql.query(prepare_query, data_form.id_bio, (err, result) => {
        if (err) {
            console.log(err);
        }
        return res.json({
            status: true,
            code: 200,
            data: result[0]
        });
    });
});

app.put('/do_update_bio', csrfProtection, (req, res) => {

    let { nama_lengkap, alamat, kelas, id_bio } = req.body;

    let prepare_query = 'UPDATE biodata SET nama_lengkap = ?, alamat = ?, kelas = ? WHERE id_bio = ?';

    db_mysql.query(prepare_query, [nama_lengkap, alamat, kelas, id_bio], (err, result) => {
        if (err) {
            console.log(err);
        }
        let infom = result.message;
        console.log(infom);
        return res.json({
            status: true,
            code: 200,
            msg: 'Data has been successfully updated'
        });
    });
});


app.delete('/do_delete/:id_bio', csrfProtection, (req, res) => {

    let data_form = {
        id_bio: req.params.id_bio
    };

    let prepare_query = 'DELETE  FROM biodata WHERE id_bio = ?';

    db_mysql.query(prepare_query, data_form.id_bio, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        return res.json({
            status: true,
            code: 200,
            msg: 'Data has been successfully deleted'
        });
    });
});




/**
 * ==============================================================================+
 *                                                                               |
 *                               Lister or Create Log Server                     |
 *                                                                               |
 * ==============================================================================+
 */
app.listen(port, () =>
    console.log(
        `App listening to port http://localhost:${port}, Running at: ${new Date()
            .toISOString()
            .replace("T", " ")
            .substring(0, 19)}`
    )
);
