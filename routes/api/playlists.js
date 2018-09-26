// ==============================================================================
// Set Dependencies
// ==============================================================================

const router = require("express").Router();
const playlistsController = require("../../controllers/playlistsController");

// ==============================================================================
// Playlists API Routes
// ==============================================================================

//***** THESE ARE JUST EXAMPLES FOR NOW ****

// Matches with "/api/user/:userId"
router.route("/user/:userId")
  .get(playlistsController.findByUser)
  .post(playlistsController.create);

// Matches with "/api/playlists/:id"
router
  .route("/:id")
  .get(playlistsController.findById)
  .put(playlistsController.update)
  .delete(playlistsController.remove);



module.exports = router;
