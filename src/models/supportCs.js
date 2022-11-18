import mongoose from "mongoose";
const supportSchema = new mongoose.Schema(
    {
        ho_ten: {
            type : String,
            require: true
        },
        dien_thoai:{
            type: String,
            require:true
        },
        email:{
            type: String,
            require:true
        },
        ghi_chu:{
            type : String,
            require: true
        },
        status:{
            type: Number,
            default: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("supportSchema", supportSchema);