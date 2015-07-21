var nodemailer = require('nodemailer');

module.exports = function(credentials) {

	var mailTransport = nodemailer.createTransport('SMTP', {
		host: credentials.mail.server,
		secureConnection: credentials.mail.secure,
		port: credentials.mail.port,
		auth: {
			user: credentials.mail.user,
			pass: credentials.mail.pass
		}
	});

	var from = '"Test Projekt" <noreply@nextron.ch>';

	return {
		send: function(to, subject, body) {
			mailTransport.sendMail({
				from: from,
				to: to,
				subject: subject,
				html: body,
				generateTextFromHtml: true
			}, function(err) {
				if(err) console.error('Unable to send email: ' + err);
			});
		}
	}

}