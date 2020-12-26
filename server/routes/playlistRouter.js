const express = require('express');
const PlayList = require('../models/PlayList');
const playListController = require('../controllers/playListController');

function routes() {
  const playListRouter = express.Router();

  const controller = playListController(PlayList);

  // METHOD TO ALL PLAYLISTS
  playListRouter.route('/secure/playlist').get(controller.get);

  // METHOD TO GET PLAYLIST BY ID
  playListRouter
    .route('/secure/playlist/:playListId')
    .get(controller.getPlayListById);

  // METHOD TO CREATE A PLAYLIST
  playListRouter.route('/secure/playlist').post(controller.post);

  return playListRouter;
}

module.exports = routes;
