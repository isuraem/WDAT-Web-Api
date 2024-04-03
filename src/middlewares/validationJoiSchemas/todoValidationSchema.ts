import Joi from 'joi';

const analyticsValidationSchema = {
	addTodoDetails: Joi.object({
		name: Joi.string().regex(/^[^<>=*$^]*$/).trim().required(),
		description: Joi.string().regex(/^[^<>=*$^]*$/).trim().required(),
        status:Joi.boolean().required(),
	}),
    deleteDetails: Joi.object({
		id: Joi.string().regex(/^[^<>=*$^]*$/).trim().required(),
	}),
    completeDetails: Joi.object({
		id: Joi.string().regex(/^[^<>=*$^]*$/).trim().required(),
	}),
    updateDetails: Joi.object({
		id: Joi.string().regex(/^[^<>=*$^]*$/).trim().required(),
        description: Joi.string().regex(/^[^<>=*$^]*$/).trim().required(),
	})
};

export default analyticsValidationSchema;
