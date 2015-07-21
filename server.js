var express = require('express');
var credentials = require('./credentials.js');
var testimonials = require('./lib/testimonials.js');

var app = express();

app.set('port', process.env.PORT || 3000);

// setup view engine
var handlebars = require('express3-handlebars').create({
	defaultLayout: 'main',
	helpers: {
		section: function(name, options) {
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// static files
app.use(express.static(__dirname + '/public'));

// body parser
app.use(require('body-parser')());

// cookie parser
app.use(require('cookie-parser')(credentials.cookieSecret));

// routes
app.get('/', function(req, res) {
	// cookie test
	if(req.signedCookies.lastVisit) {
		console.log(req.signedCookies.lastVisit);
		res.clearCookie('lastVisit');
	} else
		res.cookie('lastVisit', 'blaa', {signed: true});
	res.render('home');
});
app.get('/testimonials', function(req, res) {
	res.render('testimonials', {testimonial: testimonials.getTestimonial()});
});
app.get('/contact', function(req, res) {
	res.render('contact', {csrf: 'dummy'});
});
app.post('/contact', function(req, res) {
	console.log(req.body);
	res.render('contact-finish');
});

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

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:'+app.get('port')+'; press Ctrl-C to terminate');
});