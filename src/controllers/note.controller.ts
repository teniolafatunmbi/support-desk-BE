import { Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import TicketService from '../services/ticket.service';
import paginator from '../utils/paginator';

class NoteController {
  // eslint-disable-next-line class-methods-use-this
  public getNotes = async () => {};
}

export default new NoteController();
