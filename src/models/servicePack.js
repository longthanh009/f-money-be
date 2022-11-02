import mongoose from "mongoose";

const ServicePackSchema = new mongoose.Schema(
  {
    // so thang
    numberMonth: {
        type: Number,
    },
    priceMonth:{
        type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("servicePack", ServicePackSchema);