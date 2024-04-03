import ApplicationException from './applicationException';
import { ResponseStatusCodes } from './../constants/responseStatusCodes';
import { ResponseCommonMessages } from './../constants/responseCommonMessages';

class UnauthorizedException extends ApplicationException {
    constructor(msg?: string) {
        super(msg || ResponseCommonMessages.UNAUTHORIZED, ResponseStatusCodes.UNAUTHORIZED);
    }
}

export default UnauthorizedException;
