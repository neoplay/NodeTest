var home = require('./handlers/home.js');
var testimonials = require('./handlers/testimonials.js');
var contact = require('./handlers/contact.js');

module.exports = function(app) {

	// home
	app.get('/', home.get);

	app.get('/testimonials', testimonials.get);

	app.get('/contact', contact.get);

	app.post('/contact', contact.post);

	app.get('/contact/finish', contact.finish.get);

	// error 404
	app.use(function(req, res, next) {
		res.status(404);
		res.render('404');
	});

	// error 500
	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.status(500);
		res.render('500');
	});

};