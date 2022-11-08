import mongoose from "mongoose";

const Role = new mongoose.Schema({

    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
    }
}, { timestamps: true });

module.exports = mongoose.model("Role", Role);