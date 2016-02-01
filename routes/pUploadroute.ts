import express = require('express');
import jwt = require('express-jwt');

let router = express.Router();
let mongoose = require('mongoose');
let pUpload = mongoose.model('pUpload');
let Comment = mongoose.model('Comment');
let User = mongoose.model('User');
let auth = jwt({

  userProperty:'payload',
  secret: process.env.JWT_SECRET

})

router.get("/", (req, res, next) => {
  pUpload.find({})
  .populate('createdBy', 'username')
  .populate('comments')
    .exec((err, books) => {
      Comment.populate(books.comments, {path:'createdBy', select:'username'},(err, out)=>{
        if (err) return next(err);
        res.json(books);
      })

  });
});



router.post("/", auth, (req, res, next) => {
  let pickLo = new pUpload(req.body);
  pickLo.createdBy = req['payload']._id;
  pickLo.save((err, p) => {
    if (err) return next(err);
    User.update({ _id: req['payload']._id }, { $push: { 'books': p._id } }, (err, result) => {
      if (err) return next(err);
      res.send(p);
    });
  });
});

router.put('/:_id', (req,res,next) =>{
  pUpload.findOneAndUpdate({_id:req.params._id},req.body,{new:true},(err,result)=> {
    if(err) return next(err);
    if(!result) return next({message:'Could not find and update the image.'});
    res.send(result);
  })
})



export = router;
