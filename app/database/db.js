import pg from "pg";
import dotenv from "dotenv"

dotenv.config();
const { Pool } = pg;

const dbDev = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
}

const dbConfig = process.env.DATABASE_URL ? process.env.DATABASE_URL : dbDev

const connection = new Pool(dbConfig);

export default connection;