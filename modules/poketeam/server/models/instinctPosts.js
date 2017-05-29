var mongoose = require('mongoose');

var InstinctPostSchema = new mongoose.Schema({
  title: String,
  instinctcomments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'instinctcomment' }],
  user: {type: Schema.ObjectId, ref: 'User'},
  dateCreated : {type: Date,default: Date.now},
  instinctpostReports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'instinctreport'}]
});

mongoose.model('instinctpost', InstinctPostSchema);