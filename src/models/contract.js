import mongoose from "mongoose";
import users from "./users"
import  contractDetail  from "./contractDetail"
const Contract = new mongoose.Schema(
    {
        TypeContract: {
            type : String,
        },
        userLeaderId:{
            type: Object,
            ref: users
        },
        userCustomerId:{
            type: Object,
            ref: users
        },
        totalLoanAmount:{
            type: Number,
        },
        customersGiveMoney:{
            type: Number,
        },
        daysPayable:{
            type: String,
        },
        borrowingDate:{
            type: String,
        },
        ratio:{
            type: String,
        },
        onePayPayment:{
            type: Number,
        },
        amountPaid:{
            type: Number,
        },
        remainingAmount:{
            type: Number,
        },
        contractDetailsId:{
           type: Object,
           ref:contractDetail
        },
        statusCustomer:{
            type: Number,
            default: true,
        },
        statusContract:{
            type: Number,
            default: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contract", Contract);