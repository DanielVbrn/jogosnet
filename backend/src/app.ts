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
    origin: "https://jogosnet-git-branchsecundaria-danielvbrns-projects.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Acess-Control-Allow-Headers"],  // Adicione "Authorization" aqui
    credentials: true,
    exposedHeaders: ["Authorization"],
    optionsSuccessStatus: 204,
    preflightContinue: false,   
}


app.use(cors(corsOptions))
app.use(bodyParser.json());
//app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
//app.use(express.static(path.join(__dirname, 'dist')));

app.use(routes)


app.listen(3333, () =>{
    console.log("Server is running in http://localhost:3333")
})



