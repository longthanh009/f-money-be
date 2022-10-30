import Contract from "../models/contract";

export const getContracts = async(req,res) => {
    try {
        const data = await Contract.find({})
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json("Lỗi Contract!")
    }
}

export const createContracts = async(req,res) => {
    try {
        const contracts = await Contract(req.body).save();
        res.status(200).json(contracts);
    } catch (error) {
        res.status(500).json("Thêm Thành công")
    }
}
