import ApplicationException from './applicationException';
import { ResponseStatusCodes } from '../constants/responseStatusCodes';
import { ResponseCommonMessages } from '../constants/responseCommonMessages';

class BadRequestException extends ApplicationException {
    constructor(msg?: string) {
        super(msg || ResponseCommonMessages.BAD_REQUEST, ResponseStatusCodes.BAD_REQUEST);
    }
}

export default BadRequestException;