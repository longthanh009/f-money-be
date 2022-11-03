import mongoose from "mongoose";
import users from "./users"
import  contractDetail  from "./contractDetail"
const Contract = new mongoose.Schema(
    {
        //loại hợp đồng
        TypeContract: {
            type : String,
        },
        // name người vay
        customerName: {
            type : String,
            require: true,
        },
        userLeaderId:{
            type: Object,
            ref: users
        },
        userCustomerId:{
            type: Object,
            ref: users
        },
        //tổng tiền vay(bát họ)
        totalLoanAmount:{
            type: Number,
        },
        // Tiền đưa khách
        customersGiveMoney:{
            type: Number,
        },
        // số ngày đóng
        daysPayable:{
            type: String,
        },
        // ngày vay(ngày bắt đầu và ngày kết thúc)
        borrowingDate:{
            type: String,
        },
        // tỉ lệ    
        ratio:{
            type: String,
        },
        // Tiền đóng 1 ngày
        onePayPayment:{
            type: Number,
        },
        // số tiền đã đóng
        amountPaid:{
            type: Number,
        },
        //ngày con lại phải đóng
        remainingAmount:{
            type: Number,
        },
        // ngày phải đóng   
        closingDate:{
            type: String,
        },
        contractDetailsId:{
           type: Object,
           ref:contractDetail
        },
        statusCustomer:{
            type: Number,
            default: true,
        },
        statusContract:{
            type: Number,
            default: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contract", Contract);