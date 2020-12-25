function songController(Song) {
  // Method to create a new song
  function post(req, res, next) {
    const song = new Song(req.body);

    song.save((err, savedSong) => {
      if (err) {
        // Handled by Error handler middleware
        next(err);
      }
      return res.status(201).json(savedSong);
    });
  }

  // Method to get a new song
  function get(req, res, next) {
    Song.find({}, (err, songs) => {
      if (err) {
        next(err);
      }
      const returnedSongs = [];
      songs.forEach((song) => {
        returnedSongs.push(song.transform());
      });
      return res.json(returnedSongs);
    });
  }

  // Method to get Song By Id
  function getBySongId(req, res, next) {
    Song.findById(req.params.id, (err, song) => {
      if (err) {
        next(err);
      }

      if (song) {
        const returnSong = song.transform();
        return res.json(returnSong);
      }
      return res.sendStatus(404);
    });
  }

  function deleteBySongId(req, res, next) {
    Song.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        next(err);
      }
      res.sendStatus(200);
    });
  }

  return {
    post,
    get,
    getBySongId,
    deleteBySongId,
  };
}

module.exports = songController;
