const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;


//seting up bodyparser
app.use(bodyParser.urlencoded({
    extended:false
}));

//parsing application/json
app.use(bodyParser.json());

//static file
app.use(express.static('public'));

//templating engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

//creating pool connection
const pool = mysql.createPool({
    connectionLimit  : 100,
    host             : process.env.DB_HOST,
    user             : process.env.DB_USER,
    password         : process.env.DB_PASS,
    database         : process.env.DB_NAME
});

//creating connection
pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log(`Database connected with ID : ${connection.threadId}`);
});

const router = require('./server/routes/user');
app.use('/', router);


app.listen(PORT, () => {
    console.log(`Running at PORT ${PORT}`);
});