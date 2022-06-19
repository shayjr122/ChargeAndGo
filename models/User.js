const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    block: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    messages: {
      type: [{ type: String }],
      require: true,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = model("users", UserSchema);
