const router = require("express").Router();
const { userAuth, checkRole, block } = require("../utils/Auth");
const { orderCreate, orderDelete, orderUpdate } = require("../utils/Order");

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
router.get(
  "available/station/:stationId",
  userAuth,
  block,
  async (req, res) => {}
);
router.delete(
  "/station/:stationId/order/:orderId",
  userAuth,
  block,
  async (req, res) => {
    await orderDelete(
      req.user._id,
      req.params.stationId,
      req.params.orderId,
      res
    );
  }
);

router.put(
  "/station/:stationId/orderId/:orderId",
  userAuth,
  block,
  async (req, res) => {
    await orderUpdate(
      req.user._id,
      req.params.stationId,
      req.params.orderId,
      req.body.price,
      req.body.startTime,
      req.body.endTime,
      res
    );
  }
);
module.exports = router;
