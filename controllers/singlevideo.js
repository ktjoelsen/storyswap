var express = require('express');
var router = express.Router();
const embed = require('embed-video');

var Videos = require('../models/videomodel');
var Comments = require('../models/commentmodel');
var Votes = require('../models/votemodel');

/* GET specific video */
router.get('/:videoid', function(req, res, next) {
	var videoid = req.params.videoid;
  
  // [DEBUG] PRINT VIDEO ID ...
  console.log(videoid);


//  [DEBUG] UNCOMMENT TO INSERT DUMMY VOTES.
  // Videos.findOne( 
  //   {_id: videoid},
  //   function (err,video){
  //     //console.log(req.user.username)
      
  //     video.speaker = 'test4';
  //     video.votes.courageous = 0;
  //     video.votes.unique = 1;
  //     video.votes.inspiring = 10;
  //     video.save();
  //   }    
  // );


  // [DEBUG] UNCOMMENT TO INSERT A DUMMY COMMENT...
  // Comments.collection.insert(
  //   {
  //     youtubeId: videoid,
  //     date: new Date(),
  //     commentor: 'talhanai@gmail.com',
  //     comment: 'minimzing degrees of freedom',
  //     likes: 1
  //   }
  // )

// PULL OUT THE COMMENTS...
  console.log('--- THE COMMENTS ---')

  // QUERY FOR THE COMMENTS THAT RELATE TO THIS VIDEO
  comments = Comments.collection.find({"youtubeId": videoid}).sort({date:-1}).toArray(
    function (err, data) {
    if (err) {
      console.log('Error:', err);
      // IF THE QUERY IS A SUCCESS
    } else {
            console.log('--- THE VIDEO ---')
            // LETS NOW LOAD THE VIDEO FOR THIS PAGE
            var video = Videos.findOne(
                {_id: videoid}
                , function (err,video){
                  console.log('Data:', data);
                  console.log('Found video',video)

                  // RENDER THE WEBPAGE AND PASS ALL THE RELATED DATA
                  res.render('singlevideo', {
                    user: req.user,
                    video : video,
                    data : data, // PASS THE COMMENTS DATA TO THE WEB PAGE TO POPULATE IT.
                    helpers: {
                      embedYoutube: function(options) {
                        return '<iframe src="https://www.youtube.com/embed/' + 
                          this.video.youtubeId + '?autoplay=1" frameborder="0" allowfullscreen ></iframe>';
                      }
                    }
                  });

                });
    }
  });


  // PULL OUT THE VIDEOS...
  console.log('--- PRINTING THE INSERTED ELEMENT ---')
  video = Videos.findOne(
    {_id: videoid},
    function (err,video){
      console.log('VIDEO DATA:',video);
  }
  );

});

// THIS POST UPLOADS THE USER COMMENT INTO THE DATABASE
router.post('/uploadcomment', function(req,res){
  console.log(req.body);

    // GET ALL THE INFO WE WANT TO COLLECT AND INSERT INTO THE DATABASE
   Comments.collection.insert(
     {
      youtubeId: req.body.youtubeid,
      date: new Date(),
      commentor: req.body.commentor,
      comment: req.body.comment,
      likes: 0 // INITIALIZE THE LIKES TO 0
    }
  // res.redirect('singlevideo/');
  )


//response.send(true);
// WE DONT REDIRECT BECAUSE THE USER IS STILL ON THE SAME PAGE
// AND CAN UPDATE THEIR COMMENT. REFRESHING THE PAGE FOR THE USER WOULD ANNOY THEM.

// [TO DO] STILL NEED TO CHECK FOR DUPLICATE COMMENTS.
// AT THE MOMENT THE USER CAN UPDATE THEIR COMMENTS FROM THE WEB INTERFACE
// BUT! EACH UPDATE WILL INSERT A QUERY INTO THE DATABASE
// THIS CAN BE SOLVED USING AN UPDATE WITH AN {UPSERT:TRUE}.


});


router.get('/:videoid/upvote/:category', function(req, res, next) {
	var videoid = req.params.videoid;
  var category = req.params.category
	console.log('received request to upvote ' + videoid + ' ' + category);

  // CHECK IF QUERY EXISTS
  // YOU WILL NEED TO CHANGE 'CURRENT_USER' TO THE USER_ID OF THIS SESSION (req.user.username).
  var voteData = Votes.find().and([{'youtubeId' : videoid},{'voter' : 'CURRENT_USER'},{'vote' : category}]).exec(function(err,data){
    
    // IF THERE WAS NO ERROR WITH THIS QUERY
    if (!err) {
      // IF QUERY (youtube video + user + vote category) DOES NOT EXIST
      if (data.length <= 0) { 

      // UPDATE THE VOTE DATABASE
      // INSERT THE VOTE INTO THE VOTES DATABSE IF THAT VOTE DOES NOT EXIST.
      // YOU WILL NEED TO CHANGE 'CURRENT_USER' TO THE USER_ID OF THIS SESSION (req.user.username).
      query = {$and: [{'youtubeId' : videoid},{'voter' : 'CURRENT_USER'},{'vote':category}]}
      update = {'youtubeId' : videoid , 'voter' : 'CURRENT_USER' , 'vote':category}
      // IF THE QUERY DOES NOT EXIST, THEN UPDATE
      // WE DO THIS TO DOUBLE CHECK AGAINST INSERTING DUPLICATES
      Votes.collection.update( query, update, {upsert:true} ); 

      // INCREMENT VOTE COUNTER
      // WEVE EMBEDDED THE COUNTER HERE SO THAT WE DONT DOUBLE COUNT VOTES
      Videos.findOne( {'_id': videoid}, function(err, video) {
        // INCREMENT VOTE COUNTER FOR THIS VIDEO
        video.votes[category]++;

        // SAVE THIS INFO INTO THE DB
        video.save();
        });

    }}});


  // [DEBUG] LOOK AT ALL THE VOTES FOR THAT VIDEO ID
  // var voteData = Votes.find({youtubeId : videoid}, function(err,data){
  //   if (!err) {
  //     console.log('Votes data ' + data)
  //   }
  //  });


  // [DEBUG] LOOK AT ALL THE VOTES FOR THAT SPECIFIC VIDEO ID AND USER ID
  //  var voteData = Votes.find().and([{'youtubeId' : videoid},{'voter' : 'CURRENT_USER'}]).exec(function(err,data){
  //   if (!err) {
  //     console.log('Votes data ' + data)
  //   }
  // });

  // [DEBUG] CHECK IF THE VOTE IS IN THE VOTES DATABSE.
  // try{
  // Votes.findOne({'youtubeId':videoid , 'voter':'CURRENT_USER'}, function(err,data){
  //   if(err){
  //     console.log('I got nowhere')
  //   } 
  //   else {
  //     console.log('Printing Votes Data ' + data.voter)
  //   }

  // });
  // }
  // catch(err){
  //   console.log('FAILED TO GET ANYTHING!!!')
  // }


  // [DEBUG]
  // Comments.collection.findOne({youtubeId : videoid, 'commentor' : 'CURRENT_USER'}, 
  //   function(err,data){
  //     if (err){console.log("Error")} 
  //     else { console.log("Data is" + data.date)}
  //   });

  // [DEBUG]
  // if user hasn't already upvoted the video
  // Videos.findOne( {'_id': videoid}, function(err, video) {
  //   video.votes[category]++;
  //   video.save();
  // });

	res.end('\n');

});



module.exports = router;


