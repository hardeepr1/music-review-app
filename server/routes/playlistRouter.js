const express = require('express');
const PlayList = require('../models/PlayList');

function routes() {
  const playListRouter = express.Router();

  // METHOD TO ALL PLAYLISTS
  playListRouter.route('/secure/playlist').get((req, res, next) => {
    PlayList.find({}, (error, playLists) => {
      if (error) {
        next(error);
      }
      return res.json(playLists);
    });
  });

  // METHOD TO GET PLAYLIST BY ID
  playListRouter.route('/secure/playlist/:playListId').get((req, res, next) => {
    PlayList.findById(req.params.playListId, (error, playList) => {
      if (error) {
        next(error);
      }
      return res.json(playList);
    });
  });

  // METHOD TO CREATE A PLAYLIST
  playListRouter.route('/secure/playlist').post((req, res, next) => {
    const playList = new PlayList(req.body);

    playList.save((error, savePlayList) => {
      if (error) {
        next(error);
      }
      return res.status(201).json(savePlayList);
    });
  });

  return playListRouter;
}

module.exports = routes;
