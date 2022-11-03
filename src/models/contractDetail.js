import mongoose from "mongoose";
const contractDetail = new mongoose.Schema(
    {
        //các ngày đáng tiền
        paymentDates: {
            type : String,
        },
        // tiền khách trả
        customerPay:{
            type: String,
        },
        // ngày giao dịch
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