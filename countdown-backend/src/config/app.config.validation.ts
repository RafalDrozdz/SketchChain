import * as Joi from '@hapi/joi';

const configValidationSchema = Joi.object({
  DATABASE_HOST: Joi.required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USER: Joi.required(),
  DATABASE_PASSWORD: Joi.required(),
  DATABASE_NAME: Joi.required(),
});

export default configValidationSchema;
