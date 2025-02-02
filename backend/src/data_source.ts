import {DataSource} from "typeorm"
import {Products} from "./entity/Products"
import dotenv from "dotenv"

dotenv.config()


const nameDB = process.env.NAMEDB
const userDB = process.env.USER_NAME
const passwordDB = process.env.USER_PASSWORD



export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,  // Usa a variável de ambiente
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: ["src/subscriber/*.ts"],
    ssl: {
        rejectUnauthorized: false, // Importante para conexão segura no Render
    }
});

