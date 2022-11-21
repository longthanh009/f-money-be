import ContractMortgage from "../models/mortgageContract";

export const create = async (req, res) => {
    let tong_hd;
    let ngaykt;
    let ma_hd = req.body.ma_hd ? req.body.ma_hd : "";
    let ten_khach_hang = req.body.ten_khach_hang ? req.body.ten_khach_hang : "";
    let cccd = req.body.cccd ? req.body.cccd : "";
    let dien_thoai = req.body.dien_thoai ? req.body.dien_thoai : "";
    let dia_chi = req.body.dia_chi ? req.body.dia_chi : "";
    let khoan_vay = req.body.khoan_vay ? req.body.khoan_vay : "";
    let phi_dv = req.body.phi_dv ? req.body.phi_dv : "";
    let han_vay = req.body.han_vay ? req.body.han_vay : "";
    let thong_tin = req.body.thong_tin ? req.body.thong_tin : "";
    let ghi_chu = req.body.ghi_chu ? req.body.ghi_chu : "";
    let nguoi_tao_hd = req.body.nguoi_tao_hd ? req.body.nguoi_tao_hd : "";
    if (ten_khach_hang == "" || cccd == "" || dien_thoai == "" || dia_chi == "" || khoan_vay == "" || phi_dv == "" || han_vay == "" || thong_tin == "" || nguoi_tao_hd == "") {
        return res.status(200).json({ 'error': "Dữ liệu không đúng yêu cầu !!" });
    } else {
        tong_hd = parseInt(khoan_vay) + parseInt(phi_dv);
        ngaykt = new Date().getTime() + (parseInt(han_vay) * 24 * 60 * 60 * 1000);
    }
    try {
        const data = await ContractMortgage({ ma_hd, ten_khach_hang, cccd, dia_chi, dien_thoai, khoan_vay, phi_dv, han_vay, thong_tin, ghi_chu, nguoi_tao_hd, tong_hd, han_hd: ngaykt }).save();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ "error": "Lỗi không tạo được hợp đồng vay tín chấp" })
    }
}
export const getContractMortgage = async (req, res) => {
    const user_id = req.query.id;
    const formDate = req.query.formdate;
    const toDate = req.query.todate;
    if (user_id) {
        let objfind = {};
        if (formDate) {
            let end
            objfind = { $gte: new Date(parseInt(formDate)) }
            if (toDate) {
                end = parseInt(toDate) + (24 * 60 * 60 * 1000)
                objfind = { $gte: new Date(parseInt(formDate)), $lt: new Date(parseInt(end)) }
            }
            try {
                const userExits = await User.findOne({ "_id": user_id }).exec()
                if (!userExits) {
                    return res.status(400).json({ "message": "Dữ liệu không đúng" });
                } else {
                    if (userExits.role == 2) {
                        const data = await ContractMortgage.find({}).exec()
                        return res.status(200).json(data);
                    } else {
                        const data = await ContractMortgage.find({ "nguoi_tao_hd": user_id, "createdAt": objfind }).exec()
                        return res.status(200).json(data);
                    }
                }
            } catch (error) {
                res.status(500).json({ "error": "Dữ liệu không đúng hoặc không tồn tại !!" })
            }
        }
        try {
            const userExits = await User.findOne({ "_id": user_id }).exec();
            if (!userExits) {
                return res.status(400).json({ "message": "Dữ liệu không đúng" });
            } else {
                if (userExits.role == 2) {
                    const data = await ContractMortgage.find({}).exec()
                    return res.status(200).json(data);
                } else {
                    const data = await ContractMortgage.find({ "nguoi_tao_hd": user_id }).exec()
                    return res.status(200).json(data);
                }
            }
        } catch (error) {
            res.status(500).json({ "error": "Dữ liệu không đúng hoặc không tồn tại !!" })
        }
    } else {
        return res.status(400).json({ "message": "Dữ liệu không đúng" });
    }
}
