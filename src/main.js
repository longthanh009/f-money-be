import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import adminAuth from "./routes/admin"
import userLenderAuth from "./routes/userLender"
import userCustomerAuth from "./routes/userCustomer"
import routerBank from "./routes/bankAccount";
import routerService from "./routes/bankAccount";
import routerContract from './routes/contract.js'
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
import routerUsers from "./routes/users"



// import routeAuth from "./routes/use.js"
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
app.use("/api", routerBank);
app.use("/api", routerService);
app.use("/api", adminAuth);
app.use("/api", userLenderAuth);
app.use("/api", userCustomerAuth);
app.use("/api" , routerContract)
app.use("/api", routerUsers);
// app.use("/api/users", routeUsers);


app.listen(PORT, () => {
    console.log(`APi is Running on http://localhost:${PORT}`);
})