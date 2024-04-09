import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';
import { ResponseStatusCodes } from '../util/constants/responseStatusCodes';
import { ResponseCommonMessages } from '../util/constants/responseCommonMessages';

export const validationsMiddleware = (schema: Schema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const validationResult = schema.validate(req.body);
		const { error } = validationResult;
		if (!error) {
			next();
		} else {
			const { details } = error;
			const message = details.map(i => i.message).join(',');
			return res.status(ResponseStatusCodes.BAD_REQUEST).json({ success: false, msg: ResponseCommonMessages.VALIDATIONS_ERROR, reason: message });
		}
	};
};
