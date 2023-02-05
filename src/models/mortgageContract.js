import mongoose from "mongoose";
import users from "./users";
const ContractMortgageContractSc = new mongoose.Schema(
    {
        ma_hd: {
            type: String,
            default: false,
            require: true,
        },
        // tên khách hàng
        ten_khach_hang: {
            type: String,
            require: true,
        },
        ma_khach_hang: {
            type: String,
        },
        // thẻ căn cước công dân
        cccd: {
            type: Number,
            require: true,
        },
        // số điện thoại
        dien_thoai: {
            type: Number,
            require: true,
        },
        // địa chỉ
        dia_chi: {
            type: String,
            require: true,
        },
        // Tiền khách hàng vay
        khoan_vay: {
            type: Number,
            require: true,
        },
        // phí dịch vụ
        phi_dv: {
            type: Number,
            require: true,
        },
        //Bốc trong vòng
        han_vay: {
            type: Number,
            require: true,
        },
        // ghi chú
        thong_tin: {
            type: String,
            require: true
        },
        ghi_chu: {
            type: String,
        },
        //ID Ng cho vay    ----->
        nguoi_tao_hd: {
            type: Object,
            ref: users,
        },
        // Tổng số tiền khách đã đóng
        da_thanh_toan: {
            type: Number,
            default: 0
        },
        tong_hd: {
            type: Number,
            require: true,
        },
        han_hd: {
            type: Number,
        },
        hinh_anh: {
            type: String,
        },
        ngay_vay: {
            type: Number,
            require: true,
        },
        status: {
            type: Number,
            default: 0,
        },
    }, { timestamps: true });
module.exports = mongoose.model("ContractMortgageContractSc", ContractMortgageContractSc);