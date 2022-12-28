/* eslint-disable camelcase */
import { Request, Response } from 'express';
import NoteService from '../services/note.service';

import catchAsync from '../utils/catchAsync';
import paginator from '../utils/paginator';

class NoteController {
  protected noteService = new NoteService();

  /**
   *
   * @desc Returns all ticket's notes
   * @route GET /api/notes
   *
   * @access Private
   */
  public getTicketNotes = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;
    const { page, size, ticket_id } = req.query;

    const userId = user._id;
    // eslint-disable-next-line camelcase
    const ticketId = ticket_id.toString();

    const pageNumber = page !== undefined ? parseInt(page.toString(), 10) : 1;
    const pageSize = size !== undefined ? parseInt(size.toString(), 10) : 10;

    const limit = pageSize < 1 || pageSize > 100 ? 10 : pageSize;
    const offset = paginator.offset(pageNumber, pageSize);

    const { notes, notesCount } = await this.noteService.all({ userId, ticketId, offset, limit });

    const pointers = paginator.pageUrls(pageNumber, limit, notesCount, `${req.baseUrl}`);

    return res.status(200).json({
      data: {
        items: notes,
        previous_page: pointers.previous,
        next_page: pointers.next,
        total: notesCount,
      },
    });
  });

  /**
   *
   * @desc Adds a note to a ticket
   * @route POST /api/notes
   * @body ticket_id
   * @body text
   *
   * @access Private
   */
  public createTicket = catchAsync(async (req: Request, res: Response) => {
    const { ticketId, text } = req.body;
    const { user } = req;

    const userId = user._id;

    const note = await this.noteService.create({ payload: { ticketId, text }, userId });

    return res.status(201).json({
      message: 'Note added successfully',
      data: note,
    });
  });
}

export default new NoteController();
