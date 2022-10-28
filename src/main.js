import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
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

// const swaggerOptions = {
//     swaggerDefinition: {
//         info: {
//             title: "F-Money",
//             version: "1.0.0",
//             description: "A simple Express Library API",
//         },
//         servers: [{
//             url: "http://localhost:9000",
//         }, ],
//     },
//     apis: ['./routes/*.js']
// }

// const swaggerDocs = swaggerJSDoc(swaggerOptions);
// console.log(swaggerDocs);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const PORT = process.env.PORT || 9000;
connectDB();

app.get("/", (req, res) => {
    res.send("Backend is Running..");
});

// Router
app.use("/api", routerUsers);
// app.use("/api/users", routeUsers);


app.listen(PORT, () => {
    console.log(`APi is Running on http://localhost:${PORT}`);
})