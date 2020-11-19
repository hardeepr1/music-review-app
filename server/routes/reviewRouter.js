const express = require('express');
const Review = require('../models/Review');

//todo: validation and other things 
function routes(){
    const reviewRouter = express.Router();

    reviewRouter.route('/secure/review').post((req,res) => {
        //for time everything is set on request body like individual properties
        console.log(req.body);
        const review = new Review(req.body);

        console.log("here in review post");
        //need to good error handling
        review.save();
        res.status(201);
        return res.json(review);
    })

    //this implementation may be needed to changed for supporting all songs 
    reviewRouter.route('/secure/review/:songId').get((req,res) => {
        console.log("here it is in review get");
        console.log(req.params.songId);
        Review.find({songId: req.params.songId}, (err, reviews) => {
            console.log(reviews);
            if (err) {
                return res.send(err);
            }
            if (reviews) {
                return res.json(reviews);
            }
            return res.sendStatus(404);
        })
    })

    reviewRouter.route('/secure/review/:songId').delete((req,res) =>{
        Review.deleteOne({ songId: req.params.songId }, function (err) {
            if (err) {
                res.send(err);
            }
            res.sendStatus(200);
          });
    })

    return reviewRouter;  
}

module.exports = routes;