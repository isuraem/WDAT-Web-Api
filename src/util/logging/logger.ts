import { createLogger, format, transports } from 'winston';
const { combine, timestamp, colorize, simple } = format;

import  BadRequestException  from '../exceptions/badRequestException';
import  UnauthorizedException  from '../exceptions/unauthorizedException';

const logger = createLogger({
    format: combine(
        timestamp(),
        colorize(),
        simple()
    ),
    transports: [new transports.Console()]
});

interface ExceptionWithMsg {
    msg: string;
    stack?: string;
}

export async function log(action: string, identification_string: string, exception: Error & ExceptionWithMsg) {
    if (exception instanceof BadRequestException) {
        logger.log({
            level: 'warn',
            message: `${action} || ${identification_string} || bad_request : ${exception.msg}`
        });
    } else if (exception instanceof UnauthorizedException) {
        logger.log({
            level: 'warn',
            message: `${action} || ${identification_string} || unauthorized_action : ${exception.msg}`
        });
    } else {
        logger.log({
            level: 'error',
            stack: exception.stack,
            message: `${action} || ${identification_string} || server error : ${exception}`
        });
    }
}
