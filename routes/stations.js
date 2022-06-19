const router = require("express").Router();
const { userAuth, checkRole, block } = require("../utils/Auth");
const {
  stationRegister,
  getAllStation,
  getUserStation,
  deleteStation,
  updateStation,
  rateStation,
} = require("../utils/Station");

router.post("/register-station", userAuth, block, async (req, res) => {
  await stationRegister(req.body, req.user, res);
});
router.get("/all", userAuth, block, async (req, res) => {
  await getAllStation(req, res);
});
router.get("/", userAuth, block, async (req, res) => {
  await getUserStation(req, res);
});

router.delete("/:id", userAuth, block, async (req, res) => {
  await deleteStation(req.params.id, req.user, res);
});
router.put("/:id", userAuth, block, async (req, res) => {
  await updateStation(req.params.id, req.user, req.body, res);
});
router.post("/:id/:rate", userAuth, block, async (req, res) => {
  await rateStation(req.params.id, req.params.rate, res);
});

module.exports = router;
