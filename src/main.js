import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";

import dotenv from "dotenv";
import routerContract from './routes/contract.js'
import routerContractMortgage from './routes/mortgageContract'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import routerContractDetail from "./routes/contractDetail";
import routerUsers from "./routes/users"
import routerBank from "./routes/bankAccount";
import routerMenuLoan from "./routes/menuLoan";
import routerSupport from "./routes/supportCs";
import path from "path";
import routerService from "./routes/servicePack";
import routerBlog from "./routes/blog";
import {autoUpdateContract} from "./controllers/contract";
import {autoUpdateContractMg} from "./controllers/mortgageContract";

const cron = require('node-cron');


// import routeAuth from "./routes/use.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json())

dotenv.config();

//swagger
app.use(express.json());
const options = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "My apis in swaager F-money",
            version: "1.0.0",
        },
        servers: [{
            url: "http://localhost:9000",
        },],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{
            bearerAuth: [],
        },],
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
};
const swaggerSpecs = swaggerJSDoc(options);


const PORT = process.env.PORT || 9000;
connectDB();

app.get("/", (req, res) => {
    res.send("Backend is Running..");
});

app.use("/api", routerContract, routerContractDetail)
app.use("/api", routerUsers);
app.use("/api", routerBank);
app.use("/api", routerService);
app.use("/api", routerMenuLoan);
app.use("/api", routerSupport);
app.use("/api", routerContractMortgage);
app.use("/api", routerBlog);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// app.use("/api/users", routeUsers);

cron.schedule('00 30 23 * * 0-6', () => {
    var dataDa = new Date().getTime();
    autoUpdateContract(dataDa + (24 * 60 * 60 *1000));
    autoUpdateContractMg(dataDa + (24 * 60 * 60 *1000));
}, {
    scheduled: true,
    timezone: 'Asia/Ho_Chi_Minh'
});

app.listen(PORT, () => {
    console.log(`APi is Running on http://localhost:${PORT}`);
})