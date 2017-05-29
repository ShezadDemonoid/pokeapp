var mongoose = require('mongoose');

var InstinctReportSchema = new mongoose.Schema({
  optionsIReport: String,
  user: { type: Schema.ObjectId, ref: 'User' },
  instinctpost: { type: mongoose.Schema.Types.ObjectId, ref: 'instinctpost' },
  dateCreated : {type: Date,default: Date.now}
});

mongoose.model('instinctreport', InstinctReportSchema);