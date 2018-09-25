// ==============================================================================
// Set Dependencies
// ==============================================================================

const db = require("../models");

// ==============================================================================
// Methods for videoController
// ==============================================================================

module.exports = {
  findAll: function (req, res) {
    db.Video
      .find({})
      .then(dbResponse => res.json(dbResponse))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log(req.body)
    db.Video
      .create(req.body)
    db.User.allVideos
      .create(req.body)
      .then(dbResponse => res.json(dbResponse))
      // console.log(dbResponse))
      .catch(err => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.Video
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //removing a video finds all instances of the video in all collections and removes it from any collection where it exists.  it also removes the video from the user's "all videos" list.
  remove: function (req, res) {
    db.User.allVideos
      .findByIdAndRemove({
        _id: req.params.id
      })
    db.Playlist
      .findById({
        _id: req.params.id
      })
    db.Video
      .findById({
        _id: req.params.id
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //deleting a video will only delete it from the collection you're currently in.  this functionality will only be available from inside a collecction
  delete: function (req, res) {
    db.Playlist.findByIdAndRemove(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};