import * as dotenv from 'dotenv';
dotenv.config();

export const ConfigGlobais = {
    ENV_PORT: process.env.ENV_PORT,

    JWT_SECRET: process.env.JWT_SECRET,

    MAILER_HOST: process.env.MAILER_HOST,
    MAILER_USER: process.env.MAILER_USER,
    MAILER_PORT: process.env.MAILER_PORT,
    MAILER_PASSWORD: process.env.MAILER_PASSWORD,

    DB_TYPE: process.env.DB_TYPE,
    DB_PORT: process.env.DB_PORT,
    DB_HOST: process.env.DB_HOST,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD
};