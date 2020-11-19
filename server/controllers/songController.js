function songController(Song) {
  function post(req, res) {
    // for time everything is set on request body
    const song = new Song(req.body);
    // need to good error handling
    song.save();
    res.status(201);
    return res.json(song);
  }

  function get(req, res) {
    Song.find({}, (err, songs) => {
      const returnedSongs = [];
      songs.forEach((song) => {
        returnedSongs.push(song.transform());
      });
      return res.json(returnedSongs);
    });
  }

  function getBySongId(req, res) {
    Song.findById(req.params.id, (err, song) => {
      if (err) {
        return res.send(err);
      }

      if (song) {
        const returnSong = song.transform();
        return res.json(returnSong);
      }
      return res.sendStatus(404);
    });
  }

  function deleteBySongId(req, res) {
    Song.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.send(err);
      }
      res.sendStatus(200);
    });
  }

  return { post, get, getBySongId, deleteBySongId };
}

module.exports = songController;
