import mongoose from "mongoose";

const BankAccountSchema = new mongoose.Schema(
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
    note: {
        type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("bankAccount", BankAccountSchema);

