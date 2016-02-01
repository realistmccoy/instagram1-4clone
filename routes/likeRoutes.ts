'use strict'

import express = require('express');
import jwt = require('express-jwt');
let mongoose = require('mongoose');
let router = express.Router();
let  User = mongoose.model('User');
let pUpload = mongoose.model('pUpload');
let auth = jwt ({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

router.get('/', auth, (req,res,next)=>{
  pUpload.find({likePictureByUser: req['payload']._id})
  .exec((err, like)=>{
    if (err) return next(err);
    res.json(like)
  })
})

router.post('/', auth, (req,res,next)=> {
  pUpload.findOne({_id: req.body.like})
  .exec((err,result)=> {
    if(result){
      result.likePictureByUser.push(req['payload']._id);
      result.save();
      next();
    }
  })
})

router.post('/', (req,res,next)=> {
  User.findOne({_id: req['payload']._id})
  .exec((err, user)=>{
    if(user){
      user.likePicture.push(req.body.like);
      user.save();
      res.send({message: 'User has liked a picture!'});



    }
  })
})

export = router;
