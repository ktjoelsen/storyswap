const mongoose = require('mongoose');

// THIS COMMENTS MODEL RECORDS THE ASSOCIATED VIDEO ID, 
// DATE-TIME COMMENT WAS MADE, 
// WHO MADE THE COMMENT, 
// THE TEXT OF THEIR COMMENT, 
// AND HOW MANY VOTES THE COMMENT RECEIVED
const commentSchema = new mongoose.Schema({
  youtubeId: String,  
  date: Date,
  commentor: String,
  comment: String, 
  likes: Number
});


// Create database model
const Comment = mongoose.model('Comments', commentSchema);

function onInsert(err, docs) {
  if (err) {
    // TODO: handle error
  } else {
    // TODO:
  }
}

module.exports = Comment;