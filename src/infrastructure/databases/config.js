import dotenv from 'dotenv';
dotenv.config();

export const db = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, 
    trustServerCertificate: true
  }
};