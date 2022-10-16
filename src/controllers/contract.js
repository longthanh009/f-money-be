import Contract from "../models/contract";

export const updateContract = async (req,res,next)=>{
    try {
      const updatedContract = await Contract.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedContract);
    } catch (err) {
      res.status(500).json("Lỗi update Contract!")
    }
  }
  
  export const deleteContract = async (req,res,next)=>{
    try {
      await Contract.findByIdAndDelete(req.params.id);
      res.status(200).json("Contract has been deleted.");
    } catch (err) {
      res.status(500).json("Lỗi delete Contract!")
    }
  }
  export const getContract = async (req,res,next)=>{
    try {
      const contract = await Contract.findById(req.params.id);
      res.status(200).json(contract);
    } catch (err) {
      res.status(500).json("không tìm thấy Contract")
    }
  }
