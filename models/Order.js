const { Schema, model } = require("mongoose");
const UserSchema = require("./User");
const StationSchema = require("./Station");

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  stationId: { type: Schema.Types.ObjectId, ref: "stations", required: true },
  appointmentDate: { type: Date, default: Date.now, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});
module.exports = model("orders", OrderSchema);
