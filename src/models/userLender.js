import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    SDT: { type: Number,  required: true},
    Email: { type: String },
    Address: { type: String, required: true },
    Avatar: { type: String },
    dateOfBirth: {type: Date},
    Expiration: {type: Date},
    TotalAmount: { type: String, default: "300000000" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userLender", UserSchema);