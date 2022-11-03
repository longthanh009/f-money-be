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
export const updateContractDetail = async (req,res,next)=>{
  try {
    const updatedContract = await contractDetail.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedContract);
  } catch (err) {
    res.status(500).json("Lỗi update contractDetail!")
  }
}
export const deleteContractDetail = async (req,res,next)=>{
  try {
    await Contract.findByIdAndDelete(req.params.id);
    res.status(200).json("contractDetail has been deleted.");
  } catch (err) {
    res.status(500).json("Lỗi delete contractDetail!")
  }
}
export const getContractDetail = async (req,res,next)=>{
  try {
    const contractDetail = await contractDetail.findById(req.params.id);
    res.status(200).json(contractDetail);
  } catch (err) {
    res.status(500).json("không tìm thấy contractDetail")
  }
}