import { Request, Response, Router } from "express";
import { loggerSetting } from "../api.setting";
import * as crypto from 'crypto';


const apiWelcome = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            "status": "success",
            "data": "welcome to Taqwa Bridge API",
        })
    } catch (err: any) {
        loggerSetting.error(`500 - welcome api route - ${err.message} - ${req.originalUrl}`)
        res.status(500).json({
            "status": "error",
            "data": err.message
        });
    }
}

const apiEncrypt = async (req: Request, res: Response) => {
    try {
        const algorithm = 'aes-256-cbc';
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
        let encrypted = cipher.update(req.body.password);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        res.status(200).json({
            "status": "success",
            "data": {
                "key": key.toString('hex'),
                "iv": iv.toString('hex'),
                "encryptedData": encrypted.toString('hex')
            },
        })
    } catch (err: any) {
        loggerSetting.error(`500 - welcome api route - ${err.message} - ${req.originalUrl}`)
        res.status(500).json({
            "status": "error",
            "data": err.message
        });
    }
}

const apiDecrypt = async (req: Request, res: Response) => {
    try {
        const algorithm = 'aes-256-cbc';
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(req.body.key, 'hex'), Buffer.from(req.body.iv, 'hex'));
        let decrypted = decipher.update(Buffer.from(req.body.encryptedData, 'hex'));
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        res.status(200).json({
            "status": "success",
            "data": decrypted.toString()
        })
    } catch (err: any) {
        loggerSetting.error(`500 - welcome api route - ${err.message} - ${req.originalUrl}`)
        res.status(500).json({
            "status": "error",
            "data": err.message
        });
    }
}

export const welcomeRoute = (app: Router) => {
    app.route(`/api/welcome`)
        .get(apiWelcome)

    app.route(`/api/encrypt`)
        .post(apiEncrypt)

    app.route(`/api/decrypt`)
        .post(apiDecrypt)
}