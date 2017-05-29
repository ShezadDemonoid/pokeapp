var mongoose = require('mongoose');

var ValorCommentSchema = new mongoose.Schema({
  body: String,
  user: { type: Schema.ObjectId, ref: 'User' },
  valorpost: { type: mongoose.Schema.Types.ObjectId, ref: 'valorpost' },
  dateCreated : {type: Date,default: Date.now}
});

mongoose.model('valorcomment', ValorCommentSchema);