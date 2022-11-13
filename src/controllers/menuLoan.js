import menuLoan from "../models/menuLoan";

export const createLoan = async (req, res) => {
    const { ho_ten, dien_thoai, dia_chi, ghi_chu, tien_vay, nguoi_yeu_cau } = req.body;
    if (ho_ten == undefined || ho_ten == "" || dien_thoai == undefined || dien_thoai == "" || dia_chi == undefined || dia_chi == "" || tien_vay == undefined || tien_vay == "") {
        return res.status(200).json({ 'error': "Dữ liệu không đúng yêu cầu !!" });
    }
    try {
        const data = await menuLoan({ ho_ten, dia_chi, dien_thoai, tien_vay, ghi_chu, nguoi_yeu_cau }).save();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({"error" : error})
    }
}
export const getMenuLoan = async (req, res) => {
    try {
        const data = await menuLoan.find().exec();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({"error" : error})
    }
}