const mongoose = require('mongoose');

const {Schema} = mongoose;

const reviewModel = new Schema({
    rating: { type: Number},
    reviewer:{type :String},
    songId: {type:String},
    reviewComment:{type:String}
});

module.exports = mongoose.model('Review', reviewModel);