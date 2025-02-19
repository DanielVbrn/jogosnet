import {DataSource} from "typeorm"
import {Products} from "./entities/Products"
import { config } from "./config/config"



const nameDB = process.env.NAMEDB
const userDB = process.env.USER_NAME
const passwordDB = process.env.USER_PASSWORD



export const AppDataSource = new DataSource({
    type: "postgres",
    url: config.databaseUrl,  
    synchronize: true,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: ["src/subscriber/*.ts"],
    ssl: {
        rejectUnauthorized: false, // Importante para conexão segura no Render
    }
});

