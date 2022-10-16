import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import routeAuth from "./routes/auth.js"
import routerContract from './routes/contract.js'
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json())

dotenv.config();

const PORT = process.env.PORT || 9000;
connectDB();

app.get("/", (req, res) => {
    res.send("Backend is Running..");
  });

// Router
app.use("/api/auth", routeAuth);
app.use("/api" , routerContract)

app.listen(PORT, () => {
    console.log(`APi is Running on http://localhost:${PORT}`);
})