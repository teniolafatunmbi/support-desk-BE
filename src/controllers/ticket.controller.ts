import { Request, Response } from 'express';
import User from '../models/user.model';
import Ticket from '../models/ticket.model';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import TicketService from '../services/ticket.service';
import paginator from '../utils/paginator';

// !TODO: Implement pagination for tickets
class TicketController {
  protected ticketService = new TicketService();

  /**
   *
   * @desc Returns all user tickets
   * @route GET /api/tickets
   *
   * @access Private
   */
  public getTickets = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;
    const { page, size } = req.query;

    const pageNumber = page !== undefined ? parseInt(page.toString(), 10) : 1;
    const pageSize = size !== undefined ? parseInt(size.toString(), 10) : 10;

    const limit = pageSize < 1 || pageSize > 100 ? 10 : pageSize;
    const offset = paginator.offset(pageNumber, pageSize);

    const { tickets, ticketsCount } = await this.ticketService.all(user, offset, limit);

    const pointers = paginator.pageUrls(pageNumber, limit, ticketsCount, `${req.baseUrl}`);

    return res.status(200).json({
      data: {
        items: tickets,
        previous_page: pointers.previous,
        next_page: pointers.next,
        total: ticketsCount,
      },
    });
  });

  /**
   *
   * @desc Returns a single ticket
   * @route GET /api/tickets/:id
   *
   * @access Private
   */
  public getSingleTicket = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;
    const { id } = req.params;

    const ticket = await this.ticketService.get(id, user);

    return res.status(200).json({
      data: ticket,
    });
  });

  /**
   *
   * @desc Creates a ticket
   * @route POST /api/tickets
   *
   * @access Private
   */
  public createTicket = catchAsync(async (req: Request, res: Response) => {
    const { product, description } = req.body;
    const { user } = req;

    const ticket = await this.ticketService.create({ product, description }, user);

    return res.status(201).json({
      message: 'Ticket created successfully',
      data: ticket,
    });
  });

  /**
   * @desc Deletes a ticket
   * @route DELETE /api/tickets/:id
   *
   * @access Private
   */
  public deleteTicket = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;
    const { id } = req.params;

    await this.ticketService.delete(id, user);

    return res.status(200).json({
      message: `Ticket ${id} deleted successfully`,
    });
  });

  /**
   * @desc Updates a ticket
   * @route PUT /api/tickets/:id
   *
   * @access Private
   */
  public updateTicket = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;
    const { id } = req.params;
    const { product, description, status } = req.body;

    const updatedTicket = await this.ticketService.update(id, { product, description, status }, user);

    return res.status(202).json({
      message: `Ticket ${id} updated successfully`,
      data: updatedTicket,
    });
  });
}

export default new TicketController();
