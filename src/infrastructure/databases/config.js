import dotenv from 'dotenv';
dotenv.config();

export const db = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  server: process.env.DB_HOST, // o el nombre/ip del servidor
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // true si estás usando Azure
    trustServerCertificate: true // en local normalmente es necesario
  }
};
