const Station = require("../models/Station");

const stationRegister = async (userDets, user, res) => {
  try {
    station = new Station({
      ...userDets,
      userId: user._id,
    });
    await station.save();
    return res.status(201).json({
      message: "The station was successfully registred.",
      success: true,
    });
  } catch {
    return res.status(500).json({
      message: "Unable to create your station.",
      success: false,
    });
  }
};

const getAllStation = async (req, res) => {
  try {
    let stations = await Station.find({}, { __v: 0 });
    res.status(200).json(stations);
  } catch {
    return res.status(500).json({
      message: "Unable to get your data.",
      success: false,
    });
  }
};

const getUserStation = async (req, res) => {
  try {
    let stations = await Station.find({ userId: req.user._id }, { __v: 0 });
    res.status(200).json(stations);
  } catch {
    return res.status(500).json({
      message: "Unable to get your data.",
      success: false,
    });
  }
};

const validateStation = async (address) => {
  let station = await Station.findOne({ address });
  return station ? false : true;
};

const deleteStation = async (stationId, user, res) => {
  try {
    let station = await Station.findOne({ _id: stationId });
    if (!station) {
      return res.status(404).json({
        message: "Station doesn't exist.",
        success: false,
      });
    }
    if (user.role !== "admin" && !user._id.equals(station.userId)) {
      return res.status(401).send("Unauthorized");
    }
    await Station.deleteOne({ _id: stationId });
    res.status(201).json({
      message: "Station deleted successfully.",
      success: true,
    });
  } catch {
    return res.status(500).json({
      message: "Unable to get your data.",
      success: false,
    });
  }
};

const updateStation = async (stationId, user, UserDets, res) => {
  try {
    let station = await Station.findOne({ _id: stationId });
    if (!station) {
      return res.status(404).json({
        message: "Station doesn't exist.",
        success: false,
      });
    }

    if (user.role !== "admin" && !user._id.equals(station.userId)) {
      return res.status(401).send("Unauthorized");
    }
    let ser = serializeStation(station, UserDets);
    await Station.updateOne(
      { _id: stationId },
      {
        $set: {
          address: ser.address,
          stationtype: ser.stationtype,
          latitude: ser.latitude,
          longitude: ser.longitude,
        },
      }
    );
    return res.status(201).json({
      message: "Station updated successfully.",
      success: true,
    });
  } catch {
    return res.status(500).json({
      message: "Unable to update your station.",
      success: false,
    });
  }
};

const rateStation = async (stationId, rate, res) => {
  try {
    let station = await Station.findOne({ _id: stationId });
    if (!station) {
      return res.status(404).json({
        message: "Station doesn't exist.",
        success: false,
      });
    }
    newRating =
      station.rating === 0
        ? rate
        : (station.rating * station.num_of_ranks + rate) /
          (station.num_of_ranks + 1);
    await Station.updateOne(
      { _id: stationId },
      {
        $set: {
          rating: newRating,
          num_of_ranks: station.num_of_ranks + 1,
        },
      }
    );
    return res.status(201).json({
      message: "Station rate updated successfully.",
      rate: `(${station.rating} * ${station.num_of_ranks} + ${rate})/(${
        station.num_of_ranks + 1
      }); = ${
        (station.rating * station.num_of_ranks + rate) /
        (station.num_of_ranks + 1)
      }`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to rate station.",
      error: error,
      success: false,
    });
  }
};

const serializeStation = (station, UserDets) => {
  return {
    address:
      UserDets.address && validateStation(UserDets.address)
        ? UserDets.address
        : station.address,
    stationtype: UserDets.stationtype
      ? UserDets.stationtype
      : station.stationtype,
    latitude: UserDets.latitude ? UserDets.latitude : station.latitude,
    longitude: UserDets.longitude ? UserDets.longitude : station.longitude,
  };
};

module.exports = {
  stationRegister,
  getAllStation,
  getUserStation,
  deleteStation,
  updateStation,
  rateStation,
};
