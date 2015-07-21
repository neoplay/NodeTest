exports.get = function(req, res) {
	// cookie test
	if(req.signedCookies.lastVisit) {
		console.log(req.signedCookies.lastVisit);
		res.clearCookie('lastVisit');
	} else
		res.cookie('lastVisit', 'blaa', {signed: true});
	res.render('home');
}