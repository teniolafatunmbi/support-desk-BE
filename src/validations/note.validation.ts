import Joi from 'joi';

const createNote = Joi.object().keys({
  ticketId: Joi.string().required(),
  text: Joi.string().required(),
});

const noteSchema = { createNote };

export default noteSchema;
