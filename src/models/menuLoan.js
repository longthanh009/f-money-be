import mongoose from "mongoose";

const MenuLoanSchema = new mongoose.Schema(
    {
        ho_ten: {
            type: String,
            require :true
        },
        dien_thoai: {
            type: Number,
            require :true
        },
        dia_chi: {
            type: String,
            require :true
        },
        tien_vay: {
            type: Number,
            require : true
        },
        ghi_chu: {
            type: String,
        },
        nguoi_yeu_cau: {
            type:  mongoose.Types.ObjectId,
            require :true
        },
        trang_thai : {
            type: Number,
            require :true,
            default : 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("MenuLoanSchema", MenuLoanSchema);

