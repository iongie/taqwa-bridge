import { DataSource } from "typeorm";
import winston from "winston";
import nodemailer from 'nodemailer';
import 'dotenv/config';
import "reflect-metadata";

const databaseSetting = new DataSource({
    type: "postgres",
    host: process.env["HOST_DB"],
    port: parseInt(process.env["PORT_DB"]!),
    username: process.env["USERNAME_DB"],
    password: process.env["PASSWORD_DB"],
    database: process.env["DB"],
    synchronize: true,
    logging: false,
    entities: [],
    subscribers: [],
    migrations: [],
    poolSize: 30000,
    entitySkipConstructor: false,
})

const emailSetting = nodemailer.createTransport({
    service: process.env['SERVICE_EMAIL'],
    host: process.env['HOST_EMAIL'],
    port: parseInt(process.env['PORT_EMAIL']!),
    secure: false,
    auth: {
        user: process.env['USERNAME_EMAIL'],
        pass: process.env['PASSWORD_EMAIL'],
    },
})

const loggerSetting = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/all.log' }),
    ],
});


export {
    databaseSetting,
    emailSetting,
    loggerSetting
}