import { CustomError } from './CustomError';



export class BadRequestError extends CustomError {

    statusCode = 404;
    constructor(public message: string) {
        super(message);

        // Only because we are extending a build in class
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{
            message: this.message
        }]
    }
}

