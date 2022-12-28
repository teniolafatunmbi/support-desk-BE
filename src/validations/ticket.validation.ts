import Joi from 'joi';

const createTicket = Joi.object().keys({
  product: Joi.string().required(),
  description: Joi.string().required(),
});

const updateTicket = Joi.object().keys({
  product: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().optional(),
});

const ticketSchema = { createTicket, updateTicket };

export default ticketSchema;
