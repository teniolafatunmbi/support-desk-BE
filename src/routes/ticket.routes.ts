import { Router } from 'express';
import TicketController from '../controllers/ticket.controller';
import authGuard from '../middlewares/auth';
import validate from '../middlewares/validate';
import ticketSchema from '../validations/ticket.validation';

const router = Router();

router
  .route('/')
  .get(authGuard, TicketController.getTickets)
  .post(authGuard, validate(ticketSchema.createTicket), TicketController.createTicket);

router
  .route('/:id')
  .get(authGuard, TicketController.getSingleTicket)
  .put(authGuard, validate(ticketSchema.updateTicket), TicketController.updateTicket)
  .delete(authGuard, TicketController.deleteTicket);

export default router;
