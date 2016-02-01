'use strict'
import express = require("express");
import jwt = require('express-jwt');
let mongoose = require("mongoose");
let router = express.Router();
let User = mongoose.model('User');
let pUpload = mongoose.model("pUpload");
let auth = jwt({

  userProperty:'payload',
    secret: process.env.JWT_SECRET
});

router.get('/:id', (req,res,next)=> {
  User.find({_id:req.body._id})
  .populate('books')

  .exec((err, use)=>{
    pUpload.populate(use.books.comments, {},(err,out)=>{


    if (err) return next(err);
    if (!use) return next({ message: 'Could not find your use.' });
    use.comments = use.comments.filter((comment) => (comment.deleted === null));
    res.send(use);
        })
  })
})

export = router;
