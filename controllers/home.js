var express = require('express');
var router = express.Router();
const embed = require('embed-video');

var passport = require('passport');

var Video = require('../models/videomodel');



/* GET videos listing. */
router.get('/', function(req, res, next) {

	console.log(req.user);
	Video.find({}).sort({date: 'desc'}).exec(function (err, videos) {

		// handle error
		if (err) return console.error(err);


		res.render('home', {
			videos: videos.slice(0,3),
			user: req.user,
			helpers: {
				embedYoutubeImg: function(options) {
					return '<img src="https://img.youtube.com/vi/' + this.youtubeId + '/hqdefault.jpg" class="img-fluid"/>';
				}
			}
		});
	});
});


module.exports = router;


