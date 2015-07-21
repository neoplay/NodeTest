var credentials = require('../credentials.js');
var emailService = require('../lib/email.js')(credentials);
var Contact = require('../models/contact.js');

exports.get = function(req, res) {
	res.render('contact', {csrf: 'dummy'});
}

exports.post = function(req, res) {
	var entry = new Contact({formfield: req.body.formfield});
	entry.save(function(err) {
		if(err) console.log(err);
	});
	res.render('emails/contact-finish', {layout: null, body: req.body}, function(err, html) {
		if(err) console.log('error in email template');
		emailService.send('u.guertler@fusion7.ch','Contact form',html);
	});
	req.session.flash = {
		type: 'info',
		intro: 'Form submitted',
		message: 'The form has been submitted'
	};
	res.redirect('/contact/finish');
}

exports.finish = {
	get: function(req, res) {
		res.render('contact-finish');
	}
}