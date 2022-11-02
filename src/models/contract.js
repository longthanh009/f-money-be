import mongoose from "mongoose";

const Contract = new mongoose.Schema(
    {
        typeContract: {
            type : String,
        },
        userLeader:{
            type: String,
        },
        userCustomer:{
            type: String ,
        },
        total_loan_Amount:{
            type: Number,
        },
        customers_give_money:{
            type: Number,
        },
        days_Payable:{
            type: String,
        },
        borrowing_Date:{
            type: String,
        },
        ratio:{
            type: String,
        },
        one_day_payment:{
            type: Number,
        },
        amount_paid:{
            type: Number,
        },
        remaining_amount:{
            type: Number,
        },
        StatusCustomer:{
            type: Number,
            default: false,
        },
        StatusContract:{
            type: Number,
            default: false,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contract", Contract);