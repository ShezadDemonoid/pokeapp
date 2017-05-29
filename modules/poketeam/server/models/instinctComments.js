var mongoose = require('mongoose');

var InstinctCommentSchema = new mongoose.Schema({
  body: String,
  user: { type: Schema.ObjectId, ref: 'User' },
  instinctpost: { type: mongoose.Schema.Types.ObjectId, ref: 'instinctpost' },
  dateCreated : {type: Date,default: Date.now}
});

mongoose.model('instinctcomment', InstinctCommentSchema);