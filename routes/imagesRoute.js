'use strict';
var express = require("express");
var jwt = require('express-jwt');
var mongoose = require("mongoose");
var router = express.Router();
var User = mongoose.model('User');
var pUpload = mongoose.model("pUpload");
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
router.get('/:id', function (req, res, next) {
    User.find({ _id: req.body._id })
        .populate('books')
        .exec(function (err, use) {
        pUpload.populate(use.books.comments, {}, function (err, out) {
            if (err)
                return next(err);
            if (!use)
                return next({ message: 'Could not find your use.' });
            use.comments = use.comments.filter(function (comment) { return (comment.deleted === null); });
            res.send(use);
        });
    });
});
module.exports = router;
