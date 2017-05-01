const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({
  youtubeId: String,  
  date: Date, 
  promptString: String,
  speaker: String,
  speakerLocation: String,
  storytitle: String,
  referredBy: String
});


// Create database model
const Video = mongoose.model('Videos', videoSchema);



// function onInsert(err, docs) {
//   if (err) {
//     // TODO: handle error
//   } else {
//     // TODO:
//   }
// };


module.exports = Video;