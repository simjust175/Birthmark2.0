import mysql2 from 'mysql2';
import { config } from 'dotenv';
config();

const db_config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

const pool = mysql2.createPool(db_config);

export default pool.promise()