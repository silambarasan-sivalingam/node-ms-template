"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const CustomError_1 = require("./CustomError");
class DatabaseConnectionError extends CustomError_1.CustomError {
    constructor(errors) {
        super('Error connecting to database');
        this.errors = errors;
        this.statusCode = 500;
        this.reason = 'Error connecting to database';
        // Only because we are extending a build in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [
            {
                message: this.reason
            }
        ];
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
