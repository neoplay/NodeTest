var testimonials = [
	"Ich bin ein Testimonial",
	"Ich bin auch ein Testimonial",
	"Das 3. und letzte Testimonial"
];

exports.getTestimonial = function() {
	var i = Math.floor(Math.random() * testimonials.length);
	return testimonials[i];
};