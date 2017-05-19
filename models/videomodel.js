const mongoose = require('mongoose');



const videoSchema = new mongoose.Schema({
  youtubeId: String,  
  date: Date, 
  promptString: String,
  speaker: String,
  speakerLocation: String,
  storytitle: String,
  referredBy: String,
  email: String,
  
  // WE USED YOUR THREE CATEGORIES TO COUNT THE VOTES FOR EACH CLASS.
  votes: {
  	courageous: Number,
  	inspiring: Number,
  	unique: Number
  }
});


// Create database model
const Video = mongoose.model('Videos', videoSchema);


module.exports = Video;