import mongoose from "mongoose";

const connectDB = async () => {
  const res = await mongoose.connect(
    "mongodb+srv://nhom2-assignment-nextjs:88888888@cluster0.fl3us.mongodb.net/DATN"
  );
  if (res) {
    console.log("Kết nối db thành công");
  }
};

export default connectDB;
