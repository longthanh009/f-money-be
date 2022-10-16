import mongoose from "mongoose";

const Contract = new mongoose.Schema(
    {
        money_loan: {
            type: Number,
        },
        money_given: {
            type: Number,
        },
        closed_days: {
            type: Date,
        },
        loan_date: {
            type: Number,
        },
        borrowed_time: {
            type: Date,
        },
        Loan_maturity_date: {
            type: String,
        },
        node: {
            type: String,
        },
        status: {
            type: Number,
            default: false,
        },
        ratio: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contract", Contract);