const Order = require("../models/Order");
const User = require("../models/User");
const Station = require("../models/Station");

const orders = async (res) => {
  let orders = await Order.find({});
  return res.status(200).json(orders);
};
const order = async (orderId, res) => {
  try {
    let order = await Order.findOne({ id: orderId });
    return res.status(200).json(order);
  } catch {
    return res.status(500).json({
      message: "unexpted error",
      success: false,
    });
  }
};
const orderCreate = async (
  userId,
  stationId,
  price,
  startTime,
  endTime,
  res
) => {
  try {
    let station = await Station.findOne({ _id: stationId });
    if (!station) {
      return res.status(404).json({
        message: "Station doesn't exist.",
        success: false,
      });
    }
    let user = await User.findOne({ _id: userId });
    if (!station) {
      return res.status(404).json({
        message: "User doesn't exist.",
        success: false,
      });
    }
    let order = new Order({
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      price,
      endTime,
    });
    await order.save();
    res.status(201).json({
      message: "Order create successfully.",
      success: true,
    });
  } catch {
    return res.status(500).json({
      message: "Unable to create order.",
      success: false,
    });
  }
};

const orderDelete = async (orderId, res) => {
  try {
    await Order.DeleteOne({ _id: orderId });
    res.status(201).json({
      message: "Order deleted successfully.",
      success: true,
    });
  } catch {
    res.status(500).json({
      message: "Unable to delete order.",
      success: true,
    });
  }
};

module.exports = {
  orderCreate,
  orderDelete,
  orders,
  order,
};
