import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import routerContract from './routes/contract.js'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import routerUsers from "./routes/users"



// import routeAuth from "./routes/use.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json())

dotenv.config();

//swagger
app.use(express.json());
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Customer API",
            description: "Customer API Information",
            contact: {
                name: "Amazing Developer"
            },
            servers: ["http://localhost:5000"]
        }
    },
    apis: ['.routes/*.js']
};
const swaggerSpecs = swaggerJSDoc(swaggerOptions);


const PORT = process.env.PORT || 9000;
connectDB();

app.get("/", (req, res) => {
    res.send("Backend is Running..");
});

app.use("/api", routerContract)
app.use("/api", routerUsers);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// app.use("/api/users", routeUsers);


app.listen(PORT, () => {
    console.log(`APi is Running on http://localhost:${PORT}`);
})