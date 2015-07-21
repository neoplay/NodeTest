var express = require('express');
var credentials = require('./credentials.js');
var mongoose = require('mongoose');
var MongoSessionStore = require('session-mongoose')(require('connect'));
var sessionStore = new MongoSessionStore({url: credentials.mongo.connectionString});

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

// mongoose
mongoose.connect(credentials.mongo.connectionString);

// body parser
app.use(require('body-parser')());

// cookie parser
app.use(require('cookie-parser')(credentials.cookieSecret));

// express session
app.use(require('express-session')({store: sessionStore}));

// flash message
app.use(function(req, res, next) {
	res.locals.flash = req.session.flash;
	delete req.session.flash;
	next();
});

// pass request object to view engine
app.use(function(req, res, next) {
	res.locals.req = req;
	next();
});

// routes
require('./routes.js')(app);

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:'+app.get('port')+'; press Ctrl-C to terminate');
});