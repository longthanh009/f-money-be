import Contract from "../models/contract";
export const getContracts = async(req,res) => {
    try {
        const data = await Contract.find({})
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json("Lỗi Contract!")
    }
}