import logger from '../util/logger';
import { AppError } from './../util/error';
import type {NextFunction, Request, Response} from "express"

//TODO: make sure to return the payload with all necessary fields for all errors (e.g: Zod Error)
const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err)
    const statusCode = err.statusCode || 500
    res.status(statusCode).json(err.serialize())
}

export default errorHandler