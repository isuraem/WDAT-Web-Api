import { ResponseStatusCodes } from './../constants/responseStatusCodes';
import { ResponseCommonMessages } from './../constants/responseCommonMessages';

class ApplicationException extends Error {
    msg: string;
    status: number;

    constructor(msg?: string, status?: number) {
        super();

        // Ensure stack trace is captured properly
        Error.captureStackTrace(this, this.constructor);

        // Set error properties
        this.name = this.constructor.name;
        this.msg = msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR;
        this.status = status || ResponseStatusCodes.INTERNAL_SERVER_ERROR;
    }
}

export default ApplicationException;
