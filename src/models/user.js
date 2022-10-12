import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String, required: true },
    phone:{
        type: Number,
    },
    CCCD:{
        type: Number,
    },
    address: {
        type: String,
    },
    totalMoney: {
        type: Number,
    },
    Role: {
    type: Number,
    default: false,
    },
    date: {
        type: Date,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);