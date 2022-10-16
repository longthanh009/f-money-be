import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    bank:{
        type: String,
    },
    accountNumber: {
        type: Number,
    },
    accountHolder: {
        type: String,
    },
    Note: {
        type: String,
    },
    numberMonth: {
        type: Number,
    },
    priceMonth:{
        type: Number
    },
    totalMoney:{
        type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("service", ServiceSchema);