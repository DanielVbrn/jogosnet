import "reflect-metadata"
import express, { Request, Response } from "express"
import { AppDataSource } from "./data_source"
import routes from "./routes"
import cors from "cors"
import bodyParser from "body-parser"
import path from "path"


const app = express()

AppDataSource.initialize().then(() => {

}).catch((error) => console.log(error))


const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Headers"], 
    credentials: true,
    exposedHeaders: ["Authorization"],
    optionsSuccessStatus: 204,
    preflightContinue: false,   
}


app.use(bodyParser.json());
app.use(cors(corsOptions))

app.use(routes)


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

