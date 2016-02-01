'use strict';
var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var router = express.Router();
var User = mongoose.model('User');
var pUpload = mongoose.model('pUpload');
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
router.get('/', auth, function (req, res, next) {
    pUpload.find({ likePictureByUser: req['payload']._id })
        .exec(function (err, like) {
        if (err)
            return next(err);
        res.json(like);
    });
});
router.post('/', auth, function (req, res, next) {
    pUpload.findOne({ _id: req.body.like })
        .exec(function (err, result) {
        if (result) {
            result.likePictureByUser.push(req['payload']._id);
            result.save();
            next();
        }
    });
});
router.post('/', function (req, res, next) {
    User.findOne({ _id: req['payload']._id })
        .exec(function (err, user) {
        if (user) {
            user.likePicture.push(req.body.like);
            user.save();
            res.send({ message: 'User has liked a picture!' });
        }
    });
});
module.exports = router;
