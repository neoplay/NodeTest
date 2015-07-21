var testimonials = require('../lib/testimonials.js');

exports.get = function(req, res) {
	res.render('testimonials', {testimonial: testimonials.getTestimonial()});
}