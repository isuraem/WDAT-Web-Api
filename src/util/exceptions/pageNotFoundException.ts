import ApplicationException from './applicationException';
import { ResponseStatusCodes } from './../constants/responseStatusCodes';
import { ResponseCommonMessages } from './../constants/responseCommonMessages';

class PageNotFoundException extends ApplicationException {
    constructor(msg?: string) {
        super(msg || ResponseCommonMessages.NOT_FOUND, ResponseStatusCodes.NOT_FOUND);
    }
}

export default PageNotFoundException;
