import logger from '../util/logger';
import { AppError } from './../util/error';
import type {NextFunction, Request, Response} from "express"

const errorHandler = async (err: AppError, req: Request, res: Response,) => {
    logger.error(err)
    res.status(err.statusCode).json({message: err.message})
}

export default errorHandler