import type { Response } from "express";
import { ModuleNameType } from "./constant";
import { ErrorStatusCode } from "./util.types";

export class CustomError extends Error {
    public readonly errorType = 'custom';
    public readonly timeStamp: string;

    constructor(msg: string, public moduleName: ModuleNameType, public statusCode: ErrorStatusCode, public details?: unknown) {
        super(msg)

        this.moduleName = moduleName;
        this.statusCode = statusCode;
        this.details = details;
        this.timeStamp = new Date().toString();
    }
}

export const handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
        console.log('CustomError', error);
        res.status(error.statusCode).send(error.message);
        return;
    }

    console.log(`internal server error`, error);
    // we should alert ourself
    res.status(500).send('internal server');
}