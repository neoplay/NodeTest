var mongoose = require('mongoose');

var schema = mongoose.Schema({
	formfield: String
});

var Contact = mongoose.model('Contact', schema);

module.exports = Contact;