import { StatusCodes } from "http-status-codes";
import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { ValidationError } from "../util/error";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages: string[] = err.issues.map((issue) => {
          return `${issue.path}: ${issue.message}`;
        });
        next(new ValidationError(errorMessages));
      } else {
        next(err);
      }
    }
  };
}
