const mongoose = require('mongoose');

const { Schema } = mongoose;

const songModel = new Schema({
  id: Number,
  songTitle: { type: String, maxlength: 30, unique: true },
  artist: { type: String, maxlength: 30 },
  album: { type: String, maxlength: 30 },
  year: { type: String },
  comment: { type: String },
  genre: { type: String },
});

songModel.method('transform', function cb() {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model('Song', songModel);
