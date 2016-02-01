"use strict";
var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var mongoose = require('mongoose');
var pUpload = mongoose.model('pUpload');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
router.get("/", function (req, res, next) {
    pUpload.find({})
        .populate('createdBy', 'username')
        .populate('comments')
        .exec(function (err, books) {
        Comment.populate(books.comments, { path: 'createdBy', select: 'username' }, function (err, out) {
            if (err)
                return next(err);
            res.json(books);
        });
    });
});
router.post("/", auth, function (req, res, next) {
    var pickLo = new pUpload(req.body);
    pickLo.createdBy = req['payload']._id;
    pickLo.save(function (err, p) {
        if (err)
            return next(err);
        User.update({ _id: req['payload']._id }, { $push: { 'books': p._id } }, function (err, result) {
            if (err)
                return next(err);
            res.send(p);
        });
    });
});
router.put('/:_id', function (req, res, next) {
    pUpload.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ message: 'Could not find and update the image.' });
        res.send(result);
    });
});
module.exports = router;
