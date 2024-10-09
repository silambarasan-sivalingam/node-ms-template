"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const CustomError_1 = require("./CustomError");
class BadRequestError extends CustomError_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 404;
        // Only because we are extending a build in class
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeErrors() {
        return [{
                message: this.message
            }];
    }
}
exports.BadRequestError = BadRequestError;
