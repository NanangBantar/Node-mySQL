const mysql = require("mysql");

//creating pool connection
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// views
exports.view = (req, res) => {
    //creating connection
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`Database connected with ID : ${connection.threadId}`);

        // query sql
        connection.query("SELECT * FROM tb_user WHERE status = 'active'", (err, rows) => {
            connection.release();
            if (!err) {
                res.render("home", { rows });
            } else {
                console.log(err);
            }

            console.log(rows);
        });
    });
};

// seacrh for data
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`Database connected with ID : ${connection.threadId}`);

        let searchIpt = req.body.searchIpt;

        connection.query("SELECT * FROM tb_user WHERE firstname LIKE ? AND status = 'active'", ['%' + searchIpt + '%'], (err, rows) => {
            connection.release();
            if (!err) {
                res.render("home", { rows });
            } else {
                console.log(err);
            }

            console.log(rows);
        });

    });
};

exports.adduserpage = (req, res) => {
    res.render("add-user");
}

exports.createuser = (req, res) => {
    const { firstname, lastname, email, phone, comment } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`Database connected with ID : ${connection.threadId}`);

        connection.query("INSERT INTO tb_user SET firstname = ?, lastname = ?, email = ?, phone = ?, comment = ?", [firstname, lastname, email, phone, comment], (err, rows) => {
            connection.release();
            if (!err) {
                res.render("add-user", { alert: "New user has been added.!" });
            } else {
                console.log(err);
            }

            console.log(rows);
        });
    });
};

exports.edituserpage = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`Database connected with ID : ${connection.threadId}`);

        const id = req.params.id;

        connection.query("SELECT * FROM tb_user WHERE status = 'active' AND id = ?", [id], (err, rows) => {
            connection.release();
            if (!err) {
                res.render("edit-user", { rows });
            } else {
                console.log(err);
            }

            console.log(rows);
        });
    })
}

exports.edituser = (req, res) => {
    const { firstname, lastname, email, phone, comment } = req.body;
    const id = req.params.id;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query("UPDATE tb_user SET firstname = ?, lastname = ?, email = ?, phone = ?, comment = ? WHERE id = ?", [firstname, lastname, email, phone, comment, id], (err, rows) => {
            connection.release();
            if (!err) {
               res.redirect(`/edituser/${id}`);
            } else {
                console.log(err);
            }
        });
    });
}

exports.deleteuser = (req, res) => {
    const id = req.params.id;
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log(`Database connected with ID : ${connection.threadId}`);

        connection.query("DELETE FROM tb_user WHERE id = ?", [ id ], (err, rows) => {
            connection.release();
            if(!err){
                res.redirect('/');
            }else{  
                console.log(err);
            }
        })
    });
}

exports.viewuser = (req, res) =>{
    const id = req.params.id;

    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log(`Database connected with ID : ${connection.threadId}`);

        connection.query("SELECT * FROM tb_user WHERE id = ?", [ id ], (err, rows) => {
            connection.release();

            if(!err){
                res.render("view-user", { rows });
            }else{  
                console.log(err);
            }
            console.log(rows);
        });
    });
}