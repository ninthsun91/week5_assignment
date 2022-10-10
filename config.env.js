import dotenv from "dotenv";

dotenv.config();

export default { 
    PORT: process.env.PORT,
    SESSION_KEY: process.env.SESSION_KEY,

    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,

    JWT_KEY: process.env.JWT_KEY,
    SALT_ROUND: Number(process.env.SALT_ROUND)
}