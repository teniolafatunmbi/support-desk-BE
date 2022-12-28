import { Request, Response } from 'express';
import User from '../models/user.model';
import Ticket from '../models/ticket.model';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';

class TicketController {
  /**
   *
   * @desc Returns all user tickets
   * @route GET /api/tickets
   *
   * @access Private
   */
  public getTickets = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;

    const confirmedUser = await User.findById(user._id);

    if (!confirmedUser) {
      throw new ApiError(404, 'User not found');
    }

    const tickets = await Ticket.find({ user: confirmedUser._id });

    return res.status(200).json({
      data: tickets,
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

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new ApiError(404, 'Ticket does not exist');
    }

    const confirmUserToTicket = await Ticket.findOne({ user: user._id });

    if (!confirmUserToTicket) {
      throw new ApiError(401, 'User cannot view this ticket');
    }

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

    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const ticket = await Ticket.create({
      product,
      description,
      user: req.user._id,
      status: 'new',
    });

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

    const confirmUserToTicket = await Ticket.findOne({ user: user._id });

    if (!confirmUserToTicket) {
      throw new ApiError(401, 'User cannot delete this ticket');
    }

    const ticket = await Ticket.findById(id);

    await ticket.remove();

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

    const confirmUserToTicket = await Ticket.findOne({ user: user._id });

    if (!confirmUserToTicket) {
      throw new ApiError(401, 'User cannot update this ticket');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(202).json({
      message: `Ticket ${id} updated successfully`,
      data: updatedTicket,
    });
  });
}

export default new TicketController();
