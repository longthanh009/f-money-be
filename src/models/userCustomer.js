import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number,  required: true},
    Email: { type: String },
    Address: { type: String, required: true },
    Avatar: {
      avatar_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    dateOfBirth: {type: Date},
    SoCCCD: { type: Number, required: true },
    ImgCCCD: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userCustomer", UserSchema);