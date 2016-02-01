'use strict';
var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var router = express.Router();
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var pUpload = mongoose.model('pUpload');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
router.post('/', auth, function (req, res, next) {
    console.log('hello');
    pUpload.findOne({ _id: req.body.UcCom }).exec(function (err, UcCom) {
        console.log('findOne');
        if (err)
            return next(err);
        console.log('return');
        if (!UcCom)
            return next({ status: 404, message: "Image couldn't be found" });
        console.log('cant find 404');
        req['UcCom'] = UcCom;
        console.log('req[] uccom');
        next();
    });
});
router.post('/', function (req, res, next) {
    var comment = new Comment(req.body);
    comment.created = Date.now();
    comment.deleted = null;
    comment.createdBy = req['payload']._id;
    comment.createdByEmail = req['payload'].email;
    comment.createdByUsername = req['payload'].username;
    comment.save(function (err, c) {
        if (err)
            return next(err);
        if (!c)
            return next({ message: ' Error saving comment.' });
        req['UcCom'].comments.push(c._id);
        req['UcCom'].save();
        User.update({ _id: req['payload']._id }, { $push: { comments: c._id } }, function (err, result) {
            if (err)
                return next(err);
            c.populate('createdBy', 'username', function (err, com) {
                res.send(c);
            });
        });
    });
});
router.delete('/:id', auth, function (req, res, next) {
    Comment.update({ _id: req.params.id }, { deleted: Date.now() }, function (err, result) {
        if (err)
            return next(err);
        res.send({ message: 'Deleted the commment.' });
    });
});
module.exports = router;
