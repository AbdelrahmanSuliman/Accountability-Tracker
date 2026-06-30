import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Invalid Email or Password") {
      super(message, StatusCodes.UNAUTHORIZED)
  }
}

export class ValidationError extends AppError {
  errorMessages: string[];
  constructor(errorMessages: string[], message: string = "Invalid data") {
    super(message, StatusCodes.BAD_REQUEST);
    this.errorMessages = errorMessages;
  }
}