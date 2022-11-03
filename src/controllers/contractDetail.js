import contractDetail from "../models/contractDetail";

export const getContractDetails = async(req,res) => {
    try {
        const data = await contractDetail.find({})
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json("Lỗi Contract!")
    }
}
export const createContractDetails = async(req,res) => {
  try {
      const contracts = await contractDetail(req.body).save();
      res.status(200).json(contracts);
  } catch (error) {
      res.status(500).json("Thêm Thành công contractDetail")
  }
}
