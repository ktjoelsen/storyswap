const mongoose = require('mongoose');


// THIS MODEL RECORDS THE VOTES FOR THE VIDEO
// RECORDS THE VIDEO ID THE VOTE WAS FOR,
// WHO MADE A VOTE
// AND WHAT THE CATEGORY OF THE VOTE WAS (courage,inspire,unique)
// THIS CATEGORY CAN HAVE AS MANY STRINGS AS YOU WISH (at the moment we use your 3 classes of courage, inspire, and unique)
const voteSchema = new mongoose.Schema({
  youtubeId: String,  
  voter: String,
  vote: String
});


// Create database model
const Vote = mongoose.model('Votes', voteSchema);

function onInsert(err, docs) {
  if (err) {
    // TODO: handle error
  } else {
    // TODO:
  }
}

module.exports = Vote;