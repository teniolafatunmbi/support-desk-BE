import Joi from 'joi';

const register = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

const login = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const authSchema = { register, login };

export default authSchema;
