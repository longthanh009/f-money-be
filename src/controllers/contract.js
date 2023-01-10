import Contract from "../models/contract";
import User from "../models/users";
import mongoose from "mongoose";
const excel = require('node-excel-export');

export const getContracts = async (req, res) => {
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
            const data = await Contract.find({}).exec()
            return res.status(200).json(data);
          } else {
            const data = await Contract.find({ "nguoi_tao_hd": user_id, "createdAt": objfind }).exec()
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
          const data = await Contract.find({}).exec()
          return res.status(200).json(data);
        } else {
          const data = await Contract.find({ "nguoi_tao_hd": user_id }).exec()
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
export const createContracts = async (req, res) => {
  const { ma_hd, ten_khach_hang, cccd, dien_thoai, dia_chi, khoan_vay, lai_xuat } = req.body;
  const { han_vay, han_tra, ghi_chu } = req.body;
  const nguoi_tao_hd = req.user.id
  let date = new Date();
  let time = date.getTime();
  let objData = {};
  let ti_le = lai_xuat / 100;
  if (ten_khach_hang == "" || cccd == "" || dien_thoai == "" || khoan_vay == "" || lai_xuat == "") {
    if (han_vay == "" || han_tra == "" || nguoi_tao_hd == "") {
      res.status(200).json("Dữ liệu không đủ !!")
      return;
    }
    if (han_vay < han_tra) return res.status(200).json("Dữ liệu không đủ !!")
  }
  let cout = han_vay / han_tra; // số lần trả
  let arrDong = [];
  let dong_1 = (khoan_vay + (khoan_vay * ti_le)) / han_vay; //tiền đóng mỗi ngày
  if (han_vay % han_tra == 0) {
    let a = 0
    for (let i = 0; i < parseInt(cout); i++) {
      a += parseInt(cout)
      let his = {
        "ngay": time + (a * 24 * 60 * 60 * 1000),
        "tien": dong_1 * parseInt(han_tra),
        "trang_thai": false
      }
      arrDong.push(his);
    }
  } else {
    let a = 0
    let du = han_vay / han_tra
    for (let i = 0; i < parseInt(cout); i++) {
      a += parseInt(cout)
      let his = {
        "ngay": time + (a * 24 * 60 * 60 * 1000),
        "tien": dong_1 * parseInt(han_tra),
        "trang_thai": false
      }
      arrDong.push(his);
    }
    let his = {
      "ngay": time + (du * 24 * 60 * 60 * 1000),
      "tien": dong_1,
      "trang_thai": false
    }
    arrDong.push(his)
  }
  objData.ma_hd = ma_hd;
  objData.ten_khach_hang = ten_khach_hang;
  objData.cccd = cccd;
  objData.dien_thoai = dien_thoai;
  objData.khoan_vay = khoan_vay;
  objData.lai_xuat = lai_xuat;
  objData.han_vay = han_vay; // bn ngày
  objData.han_tra = han_tra; // bn ngày
  objData.nguoi_tao_hd = nguoi_tao_hd;
  objData.dia_chi = dia_chi;
  objData.ghi_chu = ghi_chu;
  objData.tong_hd = khoan_vay + (khoan_vay * ti_le);
  objData.han_thanh_toan = arrDong;
  objData.han_hd = time + (han_vay * 24 * 60 * 60 * 1000);
  try {
    const contracts = await Contract(objData).save();
    return res.status(200).json(contracts);
  } catch (error) {
    return res.status(400).json({ "message": error })
  }
}
export const updateContract = async (req, res, next) => {
  const { id } = req.params
  const { date, status } = req.body;
  try {
    const contract = await Contract.findOne({ "_id": id }).exec();
    if (contract) {
      let newArrTT = [];
      let thanh_toan = 0;
      let stt = 0;
      for (let i = 0; i < contract.han_thanh_toan.length; i++) {
        let childrenCt = contract.han_thanh_toan[i];
        console.log(childrenCt);
        newArrTT.push(childrenCt);
        if (childrenCt.ngay == date) {
          childrenCt.trang_thai = status;
          if (status == true) {
            thanh_toan = contract.da_thanh_toan + childrenCt.tien;
          } else {
            thanh_toan = contract.da_thanh_toan - childrenCt.tien;
          }
        }
      }
      if (contract.tong_hd == thanh_toan) {
        stt = 2
      }
      const newContract = await Contract.updateOne({ "_id": id }, { "han_thanh_toan": newArrTT, "da_thanh_toan": thanh_toan, "status": stt });
      res.status(200).json(newContract);
    } else {
      res.status(400).json("Hợp đồng không tồn tại hoặc đã bị xoá!");
    }
  } catch (err) {
    res.status(400).json("Lỗi update Contract!");
  }
}
export const deleteContract = async (req, res, next) => {
  try {
    const contract = await Contract.findByIdAndDelete(req.params.id);
    res.status(200).json(contract);
  } catch (err) {
    res.status(400).json("Lỗi delete Contract!")
  }
}
export const getContract = async (req, res, next) => {
  try {
    const contract = await Contract.findById(req.params.id);
    res.status(200).json(contract);
  } catch (err) {
    res.status(400).json("không tìm thấy Contract")
  }
}
export const deleteManyContract = async (req, res, next) => {
  try {
    const contract = await Contract.deleteMany(req.body);
    res.status(200).json(contract);
  } catch (err) {
    res.status(400).json("Lỗi delete Contract!")
  }
}
export const checkCCCD = async (req, res, next) => {
  const { cccd } = req.query;
  if (cccd) {
    try {
      const countDate = await Contract.find({ "cccd": cccd, "status": 1 }).exec();
      const count = await Contract.find({ "cccd": cccd, "status": 0 }).exec();
      if (countDate.length > 0) {
        if (count.length > 0) {
          res.status(200).json({ "message": `Đã có ${count.length} hợp đồng chưa hoàn tất và ${countDate.length} hợp đồng quá hạn.` });
          return;
        } else {
          res.status(200).json({ "message": `Đã có ${countDate.length} hợp đồng quá hạn.` });
          return;
        }
      }
      if (count.length > 0) {
        res.status(200).json({ "message": `Đã có ${count.length} hợp đồng chưa hoàn tất.` });
        return;
      }
      res.status(200).json({ "message": `Chưa có hợp đồng nào trong hệ thống.` });
      return;
    } catch (err) {
      res.status(400).json({ "message": `Không lấy được thông tin` });
      return;
    }
  } else {
    res.status(400).json("Dữ liệu không đúng");
    return;
  }
}
export const contractsExcel = async (req, res, next) => {
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
    lai_xuat: {
      displayName: 'Lãi xuất',
      headerStyle: styles.headerDark,
      cellFormat: function (value, row) {
        return `${value} %`;
      },
      width: 60
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
    han_tra: {
      displayName: 'Hạn trả /lần',
      cellFormat: function (value, row) {
        return `${value}ngày / 1 lần`;
      },
      headerStyle: styles.headerDark,
      width: 100
    },
    // han_thanh_toan: {
    //   displayName: 'Hạn trả /lần',
    //   cellFormat: function(value, row) {
    //     return `${value}ngày / 1 lần`;
    //   },
    //   headerStyle: styles.headerDark,
    //   width: 100
    // },
    cccd: {
      displayName: 'Số CCCD',
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
    da_thanh_toan: {
      displayName: 'Đã thanh toán',
      headerStyle: styles.headerDark,
      cellFormat: function (value, row) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
      },
      width: 150
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
  const id = req.user.id;;
  if (id) {
    try {
      const userExits = await User.findOne({ "_id": id }).exec();
      if (!userExits) {
        return res.status(400).json({ "message": "Dữ liệu không đúng" });
      } else {
        if (userExits.role == 2) {
          const data = await Contract.find({}).exec();
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
          const data = await Contract.find({ "nguoi_tao_hd": id }).exec();
          const report = excel.buildExport(
            [
              {
                name: 'Contracts',
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

export const autoUpdateContract = async (date) => {
  const contracts = await Contract.find({}).exec();
  for (let i = 0; i < contracts.length; i++) {
    const element = contracts[i];
    for (let j = 0; j < element.han_thanh_toan; j++) {
      const itemData = element.han_thanh_toan[j]
      if (itemData.ngay + (24 * 60 * 60 * 1000) < date && itemData.trang_thai == false) {
        const newContract = await Contract.updateOne({ "_id": element._id }, { "status": 1 }).exec();
      }
    }
  }
}