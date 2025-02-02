import {DataSource} from "typeorm"
import {Products} from "./entities/Products"
import dotenv from "dotenv"

dotenv.config()


const nameDB = process.env.NAMEDB
const userDB = process.env.USER_NAME
const passwordDB = process.env.USER_PASSWORD
const database_url = process.env.DATABASE_URL

export const AppDataSource = new DataSource({
    type:'postgres',
    url:database_url ,
    entities: [Products], 
    synchronize: true, 
    migrations: [], 
    logging: true,
})

/*
export const AppDataSource = new DataSource({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:userDB,
    password:passwordDB,
    database:nameDB,
    entities:[Products],
    migrations:[Products],
    synchronize:true,

})
*/