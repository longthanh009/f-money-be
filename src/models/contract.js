import mongoose from "mongoose";
import users from "./users";
const Contract = new mongoose.Schema(
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
    // % lai
    lai_xuat: {
      type: Number,
      require: true,
    },
    tong_hd: {
      type: Number,
      require: true,
    },
    //Bốc trong vòng
    han_vay: {
      type: Number,
      require: true,
    },
    // số ngày thanh toán 1 lần
    han_tra: {
      type: Number,
      require: true,
    },
    // ghi chú
    ghi_chu: {
      type: String,
    },
    //ID Ng cho vay    ----->
    nguoi_tao_hd: {
      type: Object,
      ref: users,
    },
    // ngày phải đóng tiền (hôm nay, ngày mai , 20/12/20021)
    han_thanh_toan: {
      type: Array,
    },
    // Tổng số tiền khách đã đóng
    da_thanh_toan: {
      type: Number,
      default :0
    },
    // ngày kết thúc vay tiền
    han_hd: {
      type: Number,
    },
    hinh_anh :{
      type: Array,
    },
    // trạng thái hợp đồng
    status: {
      type: Number,
      default: 0,
    },
  }, { timestamps: true });

module.exports = mongoose.model("Contract", Contract);
