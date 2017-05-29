var mongoose = require('mongoose');

var MysticPostSchema = new mongoose.Schema({
  title: String,
  mysticcomments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'mysticcomment' }],
  user: {type: Schema.ObjectId, ref: 'User'},
  dateCreated : {type: Date,default: Date.now},
  mysticpostReports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'mysticreport'}]
});

mongoose.model('mysticpost', MysticPostSchema);