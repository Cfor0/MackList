const db = require("../../models")
const router = require("express").Router();
const adController = require("../../controllers/adController");


// Matches with "/api/ads"
router.route("/")
  .post(adController.create)
  .get(adController.findAll)
  .put(adController.updateAd)

// Matches with "/api/ads/:id"
router
  .route("/:id")
  .get(adController.findById)
  .delete(adController.remove);

// Matches with "/api/ads/lowTohigh"
router
.route("/lowTohigh")
.put(adController.findLowPrice)

// Matches with "/api/ads/highTolow"
router
.route("/highTolow")
.put(adController.findHighPrice)

router.route("/search")
.put(adController.searchItem)

module.exports = router;
