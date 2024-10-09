"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const CustomError_1 = require("./CustomError");
class NotFoundError extends CustomError_1.CustomError {
    constructor() {
        super('Invalid request parameters');
        this.statusCode = 404;
        // Only because we are extending a build in class
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{
                message: 'Not Found'
            }];
    }
}
exports.NotFoundError = NotFoundError;
