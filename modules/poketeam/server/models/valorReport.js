var mongoose = require('mongoose');

var ValorReportSchema = new mongoose.Schema({
  optionsVReport: String,
  user: { type: Schema.ObjectId, ref: 'User' },
  valorpost: { type: mongoose.Schema.Types.ObjectId, ref: 'valorpost' },
  dateCreated : {type: Date,default: Date.now}
});

mongoose.model('valorreport', ValorReportSchema);