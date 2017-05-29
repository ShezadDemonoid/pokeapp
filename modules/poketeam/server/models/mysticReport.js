var mongoose = require('mongoose');

var MysticReportSchema = new mongoose.Schema({
  optionsMReport: String,
  user: { type: Schema.ObjectId, ref: 'User' },
  mysticpost: { type: mongoose.Schema.Types.ObjectId, ref: 'mysticpost' },
  dateCreated : {type: Date,default: Date.now}
});

mongoose.model('mysticreport', MysticReportSchema);