import logger from '../util/logger';
import { AppError } from './../util/error';
import type {NextFunction, Request, Response} from "express"

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err)
    const statusCode = err.statCode || 500
    res.status(statusCode).json({message: err.message})
}

export default errorHandler