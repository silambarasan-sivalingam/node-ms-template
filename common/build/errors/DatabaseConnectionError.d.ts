import { ValidationError } from 'express-validator';
import { CustomError } from './CustomError';
export declare class DatabaseConnectionError extends CustomError {
    errors: ValidationError[];
    statusCode: number;
    reason: string;
    constructor(errors: ValidationError[]);
    serializeErrors(): {
        message: string;
    }[];
}
