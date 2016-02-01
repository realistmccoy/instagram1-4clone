'use strict'

import mongoose = require('mongoose');

let UploadSchema  = new mongoose.Schema({
  url: {type: String, required: true},
  createdBy: { type:mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
  geotag: {type : Number },
comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
posted:{type:Date, default: Date.now},
likePictureByUser: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}]
})

export let Upload = mongoose.model('pUpload', UploadSchema);
