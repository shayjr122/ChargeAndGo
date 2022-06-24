const Order = require("../models/Order");
const User = require("../models/User");
const Station = require("../models/Station");

const orders = async (stationId, res) => {
  let orders = await Station.findOne({ _id: stationId }).populate("orders");
  return res.status(200).json(orders);
};
const order = async (orderId, res) => {
  try {
    let order = await Order.findOne({ _id: orderId });
    return res.status(200).json(order);
  } catch {
    return res.status(500).json({
      message: "unexpted error",
      success: false,
    });
  }
};

function dateCheck(from, to, check) {
  if (check <= to && check >= from) {
    return true;
  }
  return false;
}

const orderAvalable = async (station, from, to) => {
  try {
    flag = true;
    station.orders.forEach((order) => {
      if (
        dateCheck(order.startTime, order.endTime, from) ||
        dateCheck(order.startTime, order.endTime, to)
      ) {
        flag = false;
      }
    });
  } catch {}
  return flag;
};

const orderCreate = async (user, stationId, startTime, endTime, res) => {
  try {
    let station = await Station.findOne({ _id: stationId }).populate("orders");
    if (!station) {
      return res.status(404).json({
        message: "Station doesn't exist.",
        success: false,
      });
    }
    let order = new Order({
      userId: user._id,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      stationId: stationId,
    });
    if (!(await orderAvalable(station, order.startTime, order.endTime))) {
      return res.status(500).json({
        message: "Unable to create order. - not Avalable",
        success: false,
      });
    }
    await order.save();
    station.orders.push(order._id);
    await station.save();
    res.status(201).json({
      message: "Order create successfully.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create order.",
      err: error,
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
