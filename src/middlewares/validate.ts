import Joi from 'joi';
import ApiError from '../utils/ApiError';

/**
 * Validate an incoming request against the Joi schema
 * @param schema
 * @returns
 */
const validate = (schema) => (req, res, next) => {
  //   const validSchema = pick(schema, ['params', 'query', 'body']);
  //   const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(schema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(req.body);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(422, error.name, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;
