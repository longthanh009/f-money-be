import mongoose from "mongoose";
import role from "./role";

const {ObjectId } = mongoose.Types;
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
    birthDay: { type: Date },
    dateOfBirth: { type: Date },//ngày tạo tài khoản
    expiration: { type: Date },// ngày hết hạn
    role: {
        type : ObjectId,
        ref : role
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