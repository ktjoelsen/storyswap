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
        res.render('submit', {
        title: 'Pass It Forward'
        });
    } else {
        res.redirect('/login');
    };

});



 router.post('/video', function(req, res, next) {
    
    var body = req.body;
    
    var video = new Video({
        youtubeId: getYouTubeID(body.youtubeLink),
        // questionAnswered: body.promptString,
        date: Date.now(),
        newQuestion: body.newQuestion
    });
    video.save(function(err) {
        if (err) console.log(err)
    }); 


    res.render('finished_submission', {
        title: 'We are MIT'
    });

});



var getYouTubeID = function(youtubeLink) {
    var array = youtubeLink.split('=');
    var id = array[array.length - 1];
    return id;
};


module.exports = router;