import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Router
app.use("/api", routerBank);

// connect database MongoBb
mongoose.connect("mongodb://localhost:27017/f-money-clc")
.then(() =>{
    console.log("Kết nối db thành công");
})
app.listen(8000, () => {
    console.log(`Server is running on port: 8000`);
})