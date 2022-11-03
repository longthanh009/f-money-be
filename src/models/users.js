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
    phone: { type: Number, required: true },
    email: { type: String },
    CCCD: { type: String },
    imgCCCD: { type: Array },
    address: { type: String },
    avatar: { type: String },
    dateOfBirth: { type: Date },//ngày tạo tài khoản
    expiration: { type: Date },// ngày hết hạn
    role: {
        type: String,
        enum: ['admin', 'userLender', 'userCustomer'],
        default: 'userCustomer',
    },
    activate: {
        type: Boolean,
        default: false
    },
    totalAmount: { type: String, default: "300000000" },//tổng tiền 
    contract: {
        type: Array,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("Users", Users);