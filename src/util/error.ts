import { StatusCodes } from "http-status-codes";

export type FieldErrors = Record<string, string[]>

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }

  public serialize() {
    return { message: this.message };
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Invalid Email or Password") {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class ValidationError extends AppError {
  errorMessages: FieldErrors;
  constructor(errorMessages: FieldErrors, message: string = "Invalid data") {
    super(message, StatusCodes.BAD_REQUEST);
    this.errorMessages = errorMessages;
  }

  public override serialize() {
    return {message: this.message, errors: this.errorMessages}
  }
}
