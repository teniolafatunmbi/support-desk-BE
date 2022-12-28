import Ticket from '../models/ticket.model';
import User from '../models/user.model';
import ApiError from '../utils/ApiError';

class TicketService {
  // eslint-disable-next-line class-methods-use-this
  public create = async (payload: any, user: Record<string, string | boolean>) => {
    const confirmUser = await User.findById(user._id);

    if (!confirmUser) {
      throw new ApiError(404, 'User not found');
    }

    const ticket = await Ticket.create({
      ...payload,
      user: user._id,
      status: 'new',
    });

    return ticket;
  };

  // eslint-disable-next-line class-methods-use-this
  public get = async (id: string, user: Record<string, string | boolean>) => {
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new ApiError(404, 'Ticket does not exist');
    }

    const confirmUserToTicket = await Ticket.findOne({ user: user._id });

    if (!confirmUserToTicket) {
      throw new ApiError(401, 'User cannot view this ticket');
    }

    return ticket;
  };

  // eslint-disable-next-line class-methods-use-this
  public all = async (user: Record<string, string | boolean>, offset = 0, limit = 10) => {
    const confirmedUser = await User.findById(user._id);

    if (!confirmedUser) {
      throw new ApiError(404, 'User not found');
    }

    const tickets = await Ticket.find({ user: confirmedUser._id }).skip(offset).limit(limit);
    const ticketsCount = await Ticket.count();

    return { tickets, ticketsCount };
  };

  // eslint-disable-next-line class-methods-use-this
  public update = async (id: string, payload: any, user: Record<string, string | boolean>) => {
    const confirmUserToTicket = await Ticket.findOne({ user: user._id });

    if (!confirmUserToTicket) {
      throw new ApiError(401, 'User cannot update this ticket');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(id, { ...payload }, { new: true });

    return updatedTicket;
  };

  // eslint-disable-next-line class-methods-use-this
  public delete = async (id: string, user: Record<string, string | boolean>) => {
    const confirmUserToTicket = await Ticket.findOne({ user: user._id });

    if (!confirmUserToTicket) {
      throw new ApiError(401, 'User cannot delete this ticket');
    }

    const ticket = await Ticket.findById(id);

    await ticket.remove();

    return ticket;
  };
}

export default TicketService;
