import "reflect-metadata"
import express, { Request, Response } from "express"
import { AppDataSource } from "./data_source"
import routes from "./routes"
import cors from "cors"
import bodyParser from "body-parser"


const app = express()

AppDataSource.initialize().then(() => {

}).catch((error) => console.log(error))


const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],  // Adicione "Authorization" aqui
    credentials: true,
    exposedHeaders: ["Authorization"],
    optionsSuccessStatus: 204,
    preflightContinue: false,
}


app.use(express())
app.use(cors(corsOptions))
app.use(bodyParser.json());

app.use(routes)

app.listen(3333, () =>{
    console.log("Server is running in http://localhost:3333")
})



