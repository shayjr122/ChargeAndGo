const router = require("express").Router();
const { userAuth, checkRole, block } = require("../utils/Auth");
const { orderCreate, orderDelete, orders, order } = require("../utils/Order");

router.post("/station/:stationId/", userAuth, block, async (req, res) => {
  await orderCreate(
    req.user._id,
    req.params.stationId,
    req.body.price,
    req.body.startTime,
    req.body.endTime,
    res
  );
});
router.get("/:stationId", userAuth, block, async (req, res) => {
  await orders(req.params.stationId, res);
});
router.get("/:orderId", userAuth, block, async (req, res) => {
  await order(req.params.orderId, res);
});
router.delete("/:orderId", userAuth, block, async (req, res) => {
  await orderDelete(
    req.user._id,
    req.params.stationId,
    req.params.orderId,
    res
  );
});
module.exports = router;
