const express = require('express');
const Song = require('../models/Song');
const songController = require('../controllers/songController');

function routes() {
  const songRouter = express.Router();
  const controller = songController(Song);

  songRouter.route('/open/songs').get(controller.get);

  songRouter.route('/secure/song').post(controller.post);

  songRouter.route('/secure/song/:id').get(controller.getBySongId);

  songRouter.route('/admin/song/:id').delete(controller.deleteBySongId);

  return songRouter;
}

module.exports = routes;
