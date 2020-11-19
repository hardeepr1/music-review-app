const mongoose = require('mongoose');
const {Schema} = mongoose;

const playListModel = new Schema({
    title: { type: String},
    description :{type :String},
    songs: {type: [String]},
});

module.exports = mongoose.model('PlayList', playListModel);