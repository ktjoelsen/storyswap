var express = require('express');
var router = express.Router();
const embed = require('embed-video');

var passport = require('passport');

var Video = require('../models/videomodel');



/* GET videos listing. */
router.get('/', function(req, res, next) {

	Video.find({}).sort({date: 'desc'}).exec(function (err, videos) {

		// handle error
		if (err) return console.error(err);
		var newQuestion = "How are you today?";
		if(videos.length > 0) {
			newQuestion = videos[0].newQuestion
		};


		res.render('videos', {
			title: 'Pass It Forward',
			latestQuestion: videos[0].newQuestion,
			videos: videos,
			helpers: {
				embedYoutubeImg: function(options) {
					return '<img src="https://img.youtube.com/vi/' + this.youtubeId + '/hqdefault.jpg" class="img-fluid"/>';
				}
			}
		});
	});
});


module.exports = router;


