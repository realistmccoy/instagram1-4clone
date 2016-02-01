'use strict'
import express = require('express');
import jwt = require('express-jwt');
let mongoose = require('mongoose');

let router = express.Router();
let Comment = mongoose.model('Comment');
let User = mongoose.model('User');
let pUpload = mongoose.model('pUpload');

let auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty:'payload'
})

router.post('/', auth,(req,res, next) => {
  console.log('hello')
  pUpload.findOne({_id: req.body.UcCom}).exec((err,UcCom)=>{
    console.log('findOne')
    if(err) return next(err);
    console.log('return')
    if(!UcCom)return next ({status:404, message:"Image couldn't be found"});
    console.log('cant find 404')
    req['UcCom']= UcCom;
    console.log('req[] uccom')
    next();
  })
})

router.post('/', (req,res,next)=>{
  let comment = new Comment(req.body);
  comment.created = Date.now();
  comment.deleted = null;
  comment.createdBy = req['payload']._id;
  comment.createdByEmail = req['payload'].email;
  comment.createdByUsername= req['payload'].username;
  comment.save((err, c)=>{
    if(err) return next(err);
    if(!c) return next ({message: ' Error saving comment.'});
    req['UcCom'].comments.push(c._id);
    req['UcCom'].save();
    User.update({_id: req['payload']._id}, {$push:{comments: c._id}},(err,result)=>{
      if(err) return next(err);
      c.populate('createdBy','username', (err,com)=> {
        res.send(c);
      })
    })
  })
})

router.delete('/:id', auth, (req,res,next)=> {
  Comment.update({_id:req.params.id},{deleted:Date.now()},(err,result)=> {
    if(err) return next(err);
    res.send({message: 'Deleted the commment.'})
  })
})

export = router;
