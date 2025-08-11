import {DataSource} from "typeorm"
import { config } from "./config/config";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: config.databaseUrl,  
    // username: config.userDB,
    // database: config.nameDB,
    // password: config.passwordDB,
    synchronize: true,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: ["src/subscriber/*.ts"],
    ssl: {
        rejectUnauthorized: false, // Importante para conexão segura no Render
    }

});

