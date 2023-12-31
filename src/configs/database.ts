import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

let db: any;

if (process.env.ENV?.match('test')) {
  db = new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE_TEST,
  });
}

if (process.env.ENV?.match('dev')) {
  db = new Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  });
}

export default db;
