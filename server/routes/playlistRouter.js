const express = require('express');
const PlayList = require('../models/PlayList');

function routes() {
    const playListRouter = express.Router();
    
    playListRouter.route('/secure/playlist').get((req, res) =>{
        console.log("In playlist");
        
        PlayList.find({},function(err, playLists){

            if (err) {
                return res.send(err);
            }

            console.log(playLists);
            return res.json(playLists);
        });
    });

    playListRouter.route('/secure/playlist/:playListId').get((req, res) =>{
        console.log("In playlist");
        console.log(req.params.playListId);

        PlayList.findById(req.params.playListId, function(err, playList){

            if (err) {
                return res.send(err);
            }

            console.log(playList);
            return res.json(playList);
        });
    });


    playListRouter.route('/secure/playlist').post((req, res) => {

        const playList = new PlayList(req.body);

        //todo good error handling 
        playList.save();
        res.status(201);
        return res.json(playList);
    });
  
    return playListRouter;
  }
  
  module.exports = routes;