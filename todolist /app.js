// mongoose setup
require( './db/db' );

var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var ejs          = require('ejs-locals');
var index        = require('./routes/index');
var app          = express();
//bcryptjs
var bcrypt       = require('bcryptjs');

let session = require("express-session");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejs);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "tamerlareinedeschiennesvoilamonsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60, //* x heure(s)
    }
}));

app.use(function(req, res, next) {
  global.user = req.session.userid;
  next();
});

app.use('/', index);

var jsdom = require('jsdom');



module.exports = app;
