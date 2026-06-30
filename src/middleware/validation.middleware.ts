import { StatusCodes } from "http-status-codes";
import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { ValidationError, type FieldErrors } from "../util/error";
import logger from "../util/logger";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages: FieldErrors = z.flattenError(err).fieldErrors
        next(new ValidationError(errorMessages));
      } else {
        next(err);
      }
    }
  };
}
