import ContractMortgage from "../models/mortgageContract";
import User from "../models/users";
const excel = require('node-excel-export');

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
    const nguoi_tao_hd = req.user.id;
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
export const getContractMortgages = async (req, res) => {
    const user_id = req.user.id;
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

export const getContractMortgage = async (req, res) => {
    try {
        const ContractMortgages = await ContractMortgage.findById(req.params.id);
        res.status(200).json(ContractMortgages);
    } catch (err) {
        res.status(400).json("Không tìm thấy dữ liệu")
    }
}

export const deleteContractMortgage = async (req, res) => {
    try {
        const contractMortgages = await ContractMortgage.findByIdAndDelete(req.params.id);
        res.status(200).json(contractMortgages);
    } catch (err) {
        res.status(400).json("Lỗi không xóa được ContractMortgage")
    }
}

export const deleteManyMortgage = async (req, res) => {
    try {
        const Mortgage = await ContractMortgage.deleteMany(req.body);
        res.status(200).json(Mortgage);
    } catch (err) {
        res.status(400).json("Lỗi không xóa được ContractMortgage")
    }
}
export const contractsMgExcel = async (req, res, next) => {
    const styles = {
        headerDark: {
            fill: {
                fgColor: {
                    rgb: '226F37'
                }
            },
            font: {
                color: {
                    rgb: 'FFFFFFFF'
                },
                sz: 12,
                bold: true,
                underline: false
            }
        }
    };

    const heading = [
        [{ value: 'a1', style: styles.headerDark }, { value: 'b1', style: styles.headerDark }, { value: 'c1', style: styles.headerDark }],
        ['a2', 'b2', 'c2']
    ];
    const specification = {
        ma_hd: {
            displayName: 'Mã hợp đồng',
            headerStyle: styles.headerDark,
            width: 80
        },
        ten_khach_hang: {
            displayName: 'Tên Khách Hàng',
            headerStyle: styles.headerDark,
            width: 120
        },
        dien_thoai: {
            displayName: 'Điện Thoại',
            cellFormat: function (value, row) {
                return `0${value}`;
            },
            headerStyle: styles.headerDark,
            width: 150
        },
        dia_chi: {
            displayName: 'Địa chỉ',
            headerStyle: styles.headerDark,
            width: 320
        },
        khoan_vay: {
            displayName: 'Khoản vay',
            headerStyle: styles.headerDark,
            cellFormat: function (value, row) {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
            },
            width: 120
        },
        cccd: {
            displayName: 'CCCD',
            headerStyle: styles.headerDark,
            cellFormat: function (value, row) {
                return `${value} `;
            },
            width: 150
        },
        phi_dv: {
            displayName: 'Phí dịch vụ',
            headerStyle: styles.headerDark,
            cellFormat: function (value, row) {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
            },
            width: 120
        },
        tong_hd: {
            displayName: 'Tổng hợp đồng',
            headerStyle: styles.headerDark,
            cellFormat: function (value, row) {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
            },
            width: 120
        },
        han_vay: {
            displayName: 'Hạn vay',
            cellFormat: function (value, row) {
                return `${value} ngày`;
            },
            headerStyle: styles.headerDark,
            width: 100
        },
        thong_tin: {
            displayName: 'Thông tin tài sản',
            headerStyle: styles.headerDark,
            width: 100
        },
        status: {
            displayName: 'Trạng thái',
            headerStyle: styles.headerDark,
            cellFormat: function (value, row) {
                return (value == 0) ? 'Đang vay' : (value == 1) ? 'Quá hạn' : "Hoàn tất";
            },
            width: 100
        },
        han_hd: {
            displayName: 'Hạn hợp đồng',
            headerStyle: styles.headerDark,
            cellFormat: function (value, row) {
                var date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            },
            width: 100
        },
        ghi_chu: {
            displayName: 'Ghi chú',
            headerStyle: styles.headerDark,
            width: 220
        }
    }
    const merges = [
        { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
        { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
        { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
    ]
    const { id } = req.query;
    if (id) {
        try {
            const userExits = await User.findOne({ "_id": id }).exec();
            if (!userExits) {
                return res.status(400).json({ "message": "Dữ liệu không đúng" });
            } else {
                if (userExits.role == 2) {
                    const data = await ContractMortgage.find({}).exec();
                    const report = excel.buildExport(
                        [
                            {
                                name: 'Report',
                                heading: heading,
                                merges: merges,
                                specification: specification,
                                data: data
                            }
                        ]
                    );
                    res.attachment('report.xlsx');
                    return res.send(report);
                } else {
                    const data = await ContractMortgage.find({ "nguoi_tao_hd": id }).exec();
                    const report = excel.buildExport(
                        [
                            {
                                name: 'ContractsMortgage',
                                heading: heading,
                                merges: merges,
                                specification: specification,
                                data: data
                            }
                        ]
                    );
                    res.attachment('contracts.xlsx');
                    return res.send(report);
                }
            }
        } catch (error) {
            res.status(400).json({ "message": `Dữ liệu không đúng` });
            return;
        }
    } else {
        res.status(400).json({ "message": `Dữ liệu không đúng` });
        return;
    }
}

export const autoUpdateContractMg = async (date) => {
    const contracts = await ContractMortgage.find({}).exec();
    for (let i = 0; i < contracts.length; i++) {
        const element = contracts[i];
        if (itemData.han_hd + (24 * 60 * 60 * 1000) < date && itemData.trang_thai == false) {
            const newContract = await ContractMortgage.updateOne({ "_id": element._id }, { "status": 1 }).exec();
        }
    }
}