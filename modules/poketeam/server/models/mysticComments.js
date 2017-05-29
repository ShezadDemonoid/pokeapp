var mongoose = require('mongoose');

var MysticCommentSchema = new mongoose.Schema({
  body: String,
  user: { type: Schema.ObjectId, ref: 'User' },
  mysticpost: { type: mongoose.Schema.Types.ObjectId, ref: 'mysticpost' },
  dateCreated : {type: Date,default: Date.now}
});

mongoose.model('mysticcomment', MysticCommentSchema);