var mongoose = require('mongoose');

Schema = mongoose.Schema;

var InstinctEventSchema = new Schema({
	title: {
		type:String
	},
    time: {
        type:String
    },
    date:{
        type: String
    },
    location: {
        type: String
    },
    info: {
        type: String
    },
	dateCreated : {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('InstinctEvent', InstinctEventSchema);