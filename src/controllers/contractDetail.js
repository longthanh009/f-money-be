import contractDetail from "../models/contractDetail";

export const getContractDetails = async(req,res) => {
    try {
        const data = await contractDetail.find({})
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json("Lỗi Contract!")
    }
}