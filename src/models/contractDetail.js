import mongoose from "mongoose";
const contractDetail = new mongoose.Schema(
    {
        paymentDates: {
            type : String,
        },
        customerPay:{
            type: String,
        },
        dayTrading:{
            type: String,
        },
        status:{
            type: Number,
            default: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("contractDetail", contractDetail);