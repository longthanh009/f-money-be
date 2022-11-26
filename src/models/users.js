import mongoose from "mongoose";
const Users = new mongoose.Schema({
    code:{type: String},
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
    phone: { type: Number },
    email: { type: String },
    address: { type: String },
    activate: {
        isActive: {
            type : Number
        },
        end_date : {
            type : Number
        }
    },
    status:{
        type: Boolean,
        default: false
    },
    role:{
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model("Users", Users);