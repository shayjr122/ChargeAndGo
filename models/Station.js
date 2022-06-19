const { Schema, model } = require("mongoose");
const UserSchema = require("./User");
const OrderSchema = require("./Order");

const StationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    address: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    num_of_ranks: { type: Number, required: true, default: 0 },
    stationtype: { type: String, enum: ["A", "B", "C", "D"], default: "A" },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    orders: [{ type: Schema.Types.ObjectId, ref: "orders", required: true }],
  },
  { timestamps: true }
);

module.exports = model("stations", StationSchema);
