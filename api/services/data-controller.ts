import { Repository } from "typeorm";
import { loggerSetting } from "../api.setting";

const canUpload = async (param: any, res: any, repository: Repository<any>, ip: any, originalUrl: any) => {
    try {
        await repository.save(param)
    } catch (error: any) {
        loggerSetting.error(`500 - upload data - ${error.message} - ${ip} - ${originalUrl}`)
        res.status(500).json({
            "status": "error",
            "message": error.message
        });
    }
}

const canCreate = async (param: any, res: any, repository: Repository<any>, messageSuccessfuly: string, ip: any, originalUrl: any) => {
    try {
        const data = await repository.save(param)
        res.status(200).json({
            "status": "success",
            "message": messageSuccessfuly,
        })
    } catch (error: any) {
        loggerSetting.error(`500 - create data - ${error.message} - ${ip} - ${originalUrl}`)
        res.status(500).json({
            "status": "error",
            "message": error.message
        });
    }
}

const canRead = async (param: any, res: any, repository: Repository<any>, join: any = {}, ip: any, originalUrl: any) => {
    try {
        const data = await repository.find(
            {
                order: {
                    id: "DESC",
                },
                take: param.limit,
                skip: param.offset,
                relations: join
            }
        )
        res.status(200).json({
            "status": "success",
            "message": "ok",
            "data": data
        })
    } catch (error: any) {
        loggerSetting.error(`500 - read data - ${error.message} - ${ip} - ${originalUrl}`)
        res.status(500).json({
            "status": "unsuccess",
            "message": error
        });
    }
}

const canUpdate = async (id: any, dataUpdate: any, res: any, repository: Repository<any>, ip: any, originalUrl: any) => {
    try {
        const data = await repository.update(id, dataUpdate)
        res.status(200).json({
            "status": "success",
            "message": "ok",
            "data": data
        })
    } catch (error: any) {
        loggerSetting.error(`500 - create data - ${error.message} - ${ip} - ${originalUrl}`)
        res.status(500).json({
            "status": "unsuccess",
            "message": error
        });
    }
}

const canDelete = async (param: any, res: any, repository: Repository<any>, ip: any, originalUrl: any) => {
    try {
        const removeData = await repository.delete(param.id)
        res.status(200).json({
            "status": "success",
            "message": "ok",
            "data": removeData
        })
    } catch (error: any) {
        loggerSetting.error(`500 - create data - ${error.message} - ${ip} - ${originalUrl}`)
        res.status(500).json({
            "status": "unsuccess",
            "message": error
        });
    }
}

const canDeleteAll = async (res: any, repository: Repository<any>, ip: any, originalUrl: any) => {
    try {
        const data = await repository.clear()
        res.status(200).json({
            "status": "success",
            "message": "ok",
            "data": data
        })
    } catch (error: any) {
        loggerSetting.error(`500 - create data - ${error.message} - ${ip} - ${originalUrl}`)
        res.status(500).json({
            "status": "unsuccess",
            "message": error
        });
    }
}

const canSearch = async (option: any, word: any, res: any, repository: Repository<any>, ip: any, originalUrl: any) => {
    try {
        const data = await repository.createQueryBuilder()
            .where(
                `CONCAT ${option} LIKE '%${word}%'`)
            .getMany()
        res.status(200).json({
            "status": "success",
            "message": "ok",
            "data": data
        })
    } catch (error: any) {
        loggerSetting.error(`500 - create data - ${error.message} - ${ip} - ${originalUrl}`)
        res.status(500).json({
            "status": "unsuccess",
            "message": error
        });
    }
}

const canCount = async (res: any,repository: Repository<any>, ip: any, originalUrl: any) => {
    try {
        const countData = await repository.count()
        res.status(200).json({
            "status": "success",
            "message": "ok",
            "data": countData
        })
    } catch (error:any) {
        loggerSetting.error(`500 - create data - ${error.message} - ${ip} - ${originalUrl}`)
        res.status(500).json({
            "status": "unsuccess",
            "message": error
        });
    }
}

const canVerify = async (verificationKey: any, res: any,repository: Repository<any>, messageSuccessfuly: string, ip: any, originalUrl: any) => {
    try {
        let result = await repository.findOneBy({ verificationKey })
        result.activationStatus = true
        const verification = await repository.update(result.id, result)
        res.status(200).json({
            "status": "success",
            "message": "ok",
            "data": messageSuccessfuly
        })
    } catch (error: any) {
        loggerSetting.error(`500 - verification key - ${error.message} - ${ip} - ${originalUrl}`)
        res.status(500).json({
            "status": "unsuccess",
            "message": error
        });
    }
}

const canCheckEmailExist = async (email: string, res: any, repository: Repository<any>, ip: any, originalUrl: any) => {
    try {
        await repository.findOne({ where: { email } })
        res.status(400).json({
            "status": "success",
            "message": "Email already registered"
        })
    } catch (error:any) {
        loggerSetting.error(`500 - check email exist - ${error.message} - ${ip} - ${originalUrl}`)
        res.status(500).json({
            "status": "unsuccess",
            "message": error
        });
    }
}

export {
    canCreate,
    canRead,
    canUpdate,
    canDelete,
    canDeleteAll,
    canSearch,
    canCount,
    canCheckEmailExist,
    canVerify,
    canUpload
}