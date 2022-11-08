import mongoose from "mongoose";
import users from "./users";
import contractDetail from "./contractDetail"
const Contract = new mongoose.Schema(
  {
    // loại họp đồng
    typeContract: {
      type: Number,
      default: false,
      require: true,
    },
    // tên khách hàng
    customerName: {
      type: String,
      require: true,
    },
    // mã khách hàng
    contractCode: {
      type: String,
      require: true,
    },
    // thẻ căn cước công dân
    cmnd: {
      type: Number,
      require: true,
    },
    // số điện thoại
    phoneNumber: {
      type: Number,
      require: true,
    },
    // địa chỉ
    address: {
      type: String,
      require: true,
    },
    // Tiền khách hàng nhận được
    moneyReceivedByCustomer: {
      type: Number,
      require: true,
    },
    // tiền phải trả
    moneyToBePaid: {
      type: Number,
      require: true,
    },
    //Bốc trong vòng
    borrowMoneyForHowManyDays: {
      type: Number,
      require: true,
    },
    // số ngày thanh toán 1 lần
    numberOfDaysOf1Payment: {
      type: Number,
      require: true,
    },
    // ngày vay tiền
    loanDate: {
      type: String,
      require: true,
    },
    // ghi chú
    desc: {
      type: String,
    },
    //ID Ng cho vay    ----->
    userLeaderId: {
      type: Object,
      ref: users,
    },
    //ID khách hàng
    userCustomerId: {
      type: Object,
      ref: users,
    },
    // trạng thái của người vay
    statusCustomer: {
      type: Number,
      default: false,
    },
    // trạng thái hợp đồng
    statusContract: {
      type: Number,
      default: false,
    },
    //tiền đóng 1 ngày
    oneDayPayment: {
      type: Number,
    },
    // ngày phải đóng tiền (hôm nay, ngày mai , 20/12/20021)
    paymentDate: {
      type: String,
    },
    // Tổng số tiền khách đã đóng
    amountPaidCustomer: {
      type: Number,
    },
    // số tiền còn lại phải trả
    remainingAmountPaid: {
      type: Number,
    },
    // nợ cũ
    oldDebt: {
      type: Number,
    },
    // ngày kết thúc vay tiền
    loanClosingDate: {
      type: String,
    },
    // Tổng lãi phí
    totalInterest: {
      type: Number,
    },
    ///------>                                    chi tiết hợp đồng
    // ngày họ (từng ngày theo từng kỳ)
    // tiền họ (tiền đóng theo từng ngày)
    // ngày giao dịch các khoản đóng tiền (ngày nào đã đóng)
    // tiền khách trả ( theo từng ngày)
    contractDetailsId:{
      type: Object,
      ref:contractDetail
   },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contract", Contract);
