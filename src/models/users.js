import mongoose from "mongoose";

const Users = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
    },
    username: {
        type: String,
        required: [true, 'Please provide name'],
        unique: true,
        minlength: 3,
        maxlength: 50,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    SDT: { type: Number, required: true },
    Email: { type: String },
    CCCD: { type: String },
    imgCCCD: { type: String },
    Address: { type: String },
    Avatar: { type: String },
    dateOfBirth: { type: Date },
    Expiration: { type: Date },
    Activate: { type: String },
    role: {
        type: String,
        enum: ['admin', 'userLender', 'userCustomer'],
        default: 'userCustomer',
    },
    Activate: {
        type: Boolean,
        default: false
    },
    TotalAmount: { type: String, default: "300000000" },
    Contract: {
        type: Array,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("Users", Users);