
import { CustomError } from './CustomError';



export class NotFoundError extends CustomError {

    statusCode = 404;
    constructor() {
        super('Invalid request parameters');

        // Only because we are extending a build in class
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{
            message: 'Not Found'
        }]
    }
}

