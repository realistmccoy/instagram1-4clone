"use strict";
require('dotenv').config({ silent: true });
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
require('./models/users');
require('./config/passport');
require('./models/pUpload');
require('./models/comments');
if (process.env.NODE_ENV === 'test')
    mongoose.connect("mongodb://localhost/yo-test");
else
    mongoose.connect(process.env.MONGO_URL);
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var userRoutes = require('./routes/UserRoutes');
app.use('/users', userRoutes);
var pUploadroutes = require('./routes/pUploadroute');
app.use('/pUpload', pUploadroutes);
var imagesRoute = require('./routes/imagesRoute');
app.use('/imagesR', imagesRoute);
var UcRoute = require('./routes/UcRoute');
app.use('/comments', UcRoute);
var likeRoutes = require('./routes/likeRoutes');
app.use('/likePictures', likeRoutes);
app.use(express.static('./dist'));
app.use('/scripts', express.static('bower_components'));
app.get('/*', function (req, res, next) {
    if (/.js|.html|.css|templates|javascript/.test(req.path))
        return next({ status: 404, message: 'Not Found' });
    if (/application\/json/.test(req.get('accept'))) {
        return next({ status: 404, message: 'Not Found' });
    }
    else {
        return res.render('index');
    }
});
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    if (err.name = 'CastError')
        err.message = 'Invalid ID';
    var error = (app.get('env') === 'development') ? err : {};
    res.send({
        message: err.message,
        error: error
    });
});
module.exports = app;
