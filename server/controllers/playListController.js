function playListController(PlayList) {
  function get(req, res, next) {
    PlayList.find({}, (error, playLists) => {
      if (error) {
        next(error);
      }
      return res.json(playLists);
    });
  }

  function getPlayListById(req, res, next) {
    PlayList.findById(req.params.playListId, (error, playList) => {
      if (error) {
        next(error);
      }
      return res.json(playList);
    });
  }

  function post(req, res, next) {
    const playList = new PlayList(req.body);

    playList.save((error, savePlayList) => {
      if (error) {
        next(error);
      }
      return res.status(201).json(savePlayList);
    });
  }

  return {
    get,
    getPlayListById,
    post,
  };
}

module.exports = playListController;
