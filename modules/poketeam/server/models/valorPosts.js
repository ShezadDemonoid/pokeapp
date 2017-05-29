var mongoose = require('mongoose');

var ValorPostSchema = new mongoose.Schema({
  title: String,
  valorcomments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'valorcomment' }],
  user: {type: Schema.ObjectId, ref: 'User'},
  dateCreated : {type: Date,default: Date.now},
  valorpostReports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'valorreport'}]
});

mongoose.model('valorpost', ValorPostSchema);