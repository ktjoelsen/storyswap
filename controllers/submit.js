var express = require('express');
var router = express.Router();

var Video = require('../models/videomodel');

/*
 * Controller that receives information about submitted youtube videos
 * Updates the database with this new information
 *
 *
 */

 router.get('/', function(req, res, next) {
    if (req.user) {
      Video.find({}).sort({date: 'desc'}).exec(function (err, videos) {

        // handle error
        if (err) return console.error(err);
        
        res.render('submit', {
          title: 'gray',
          videos: videos
        });
      });
    } else {
      res.redirect('/auth/google');
    };
});



 router.post('/video', function(req, res, next) {

    var body = req.body;
    
    var video = new Video({
        youtubeId: getYouTubeID(body.youtubeLink),
        questionAnswered: body.questionAnswered,
        date: Date.now(),
        newQuestion: body.newQuestion,
        speaker: body.speakerName
    });
    // console.log(video);

    video.save(function(err) {
        if (err) console.log(err)
    }); 

    res.redirect('/');
});



var getYouTubeID = function(youtubeLink) {
    var array = youtubeLink.split('=');
    var id = array[array.length - 1];
    return id;
};


module.exports = router;