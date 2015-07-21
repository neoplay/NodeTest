var express = require('express');
var testimonials = require('./lib/testimonials.js');

var app = express();

app.set('port', process.env.PORT || 3000);

// setup view engine
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// static files
app.use(express.static(__dirname + '/public'));

// routes
app.get('/', function(req, res) {
	res.render('home');
});
app.get('/testimonials', function(req, res) {
	res.render('testimonials', {testimonial: testimonials.getTestimonial()});
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