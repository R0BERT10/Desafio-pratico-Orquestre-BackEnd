import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";

export const handleServerErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        if (err instanceof SyntaxError) {
            console.log(err.message)
            if (/JSON/i.test(err.message)) {
                return res.status(400).json("Bad JSON format")
            } else {
                return res.status(500).json(err.message)
            }
        } else {
            console.log(`Name ${err.name}, 
                    Message:${err.message}`)
            console.log(`Error Stack \n ${err.stack}`)
            return res.status(500).json('Unexpected server error.')
        }
    }
    if (AppDataSource.isInitialized) {
        return next()
    }
    AppDataSource.initialize().then(async () => {
        console.log("Database OK")
        return next()
    })
}

export const extractColonFromUrlMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.url.includes(':')) {
        const parts = req.url.split(':');
        req.url = parts[0] + "/internal" + parts[1];
    }
    return next();
}
