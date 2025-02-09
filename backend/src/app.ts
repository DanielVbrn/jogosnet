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
    origin: ["https://front-chi-six.vercel.app/", "https://backend-jogosnet.onrender.com"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});



app.use(bodyParser.json());
app.use(cors(corsOptions))

app.use(routes)


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

