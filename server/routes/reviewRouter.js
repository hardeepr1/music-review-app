const express = require('express');
const Review = require('../models/Review');

function routes() {
  const reviewRouter = express.Router();

  reviewRouter.route('/secure/review').post((req, res, next) => {
    const review = new Review(req.body);

    review.save((error, sReview) => {
      if (error) {
        next(error);
      }
      return res.status(201).json(sReview);
    });
  });

  reviewRouter.route('/secure/review/:songId').get((req, res, next) => {
    Review.find({ songId: req.params.songId }, (err, reviews) => {
      if (err) {
        next(err);
      }
      if (reviews) {
        return res.json(reviews);
      }
      return res.sendStatus(404);
    });
  });

  reviewRouter.route('/secure/review/:songId').delete((req, res, next) => {
    Review.deleteOne({ songId: req.params.songId }, (err) => {
      if (err) {
        next(err);
      }
      res.sendStatus(200);
    });
  });

  return reviewRouter;
}

module.exports = routes;
