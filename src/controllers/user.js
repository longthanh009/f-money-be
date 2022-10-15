import User from "../models/user";

export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json("Lỗi Server!")
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    res.status(500).json("Lỗi Server!")
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Lỗi Server!")
  }
}
//Phân trang 5 user 1 trang
const PAGE_SIZE = 5;
export const getUsers = async (req,res,next)=>{
  const page = req.query.page;
  if (page) {
    // Get page
    page = parseInt(page)
    if(page <1){
      page = 1;
    }
    const soLuongBoQua = (page-1) * PAGE_SIZE

    await User.find({}).soLuongBoQua().limit(PAGE_SIZE)
    .then(data=>{
      res.status(200).json(data);
    })
    .catch (err=>{
      res.status(500).json("Lỗi Server!")
    }) 
  } else {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json("Lỗi Server!")
    }
  }
  
}