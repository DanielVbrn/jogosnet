import dotenv from "dotenv"

dotenv.config()

export const config = {
    databaseUrl: process.env.DATABASE_URL as string,
    redisUrl: process.env.REDIS_URL as string,
    nameDB: process.env.NAMEDB as string,
    userDB: process.env.USER_NAME as string,
    passwordDB: process.env.USER_PASSWORD as string,
}