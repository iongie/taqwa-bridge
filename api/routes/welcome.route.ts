import { Request, Response, Router } from "express";
import { loggerSetting } from "../api.setting";
import * as crypto from 'crypto';
import { decrypt, encrypt } from "../services/helper";


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
        const encryptedDataResult = await encrypt(algorithm, req.body.password, key, iv)
        res.status(200).json({
            "status": "success",
            "data": encryptedDataResult
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
        const decryptedDataResult = await decrypt(algorithm, req.body.encryptedData, req.body.key, req.body.iv)
        res.status(200).json({
            "status": "success",
            "data": decryptedDataResult
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