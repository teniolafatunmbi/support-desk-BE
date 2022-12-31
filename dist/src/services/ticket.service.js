'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const ticket_model_1 = __importDefault(require('../models/ticket.model'));
const user_model_1 = __importDefault(require('../models/user.model'));
const ApiError_1 = __importDefault(require('../utils/ApiError'));
class TicketService {
  constructor() {
    // eslint-disable-next-line class-methods-use-this
    this.create = async (payload, user) => {
      const confirmUser = await user_model_1.default.findById(user._id);
      if (!confirmUser) {
        throw new ApiError_1.default(404, 'User not found');
      }
      const ticket = await ticket_model_1.default.create({
        ...payload,
        user: user._id,
        status: 'new',
      });
      return ticket;
    };
    // eslint-disable-next-line class-methods-use-this
    this.get = async (id, user) => {
      const ticket = await ticket_model_1.default.findById(id);
      if (!ticket) {
        throw new ApiError_1.default(404, 'Ticket does not exist');
      }
      const confirmUserToTicket = await ticket_model_1.default.findOne({ user: user._id });
      if (!confirmUserToTicket) {
        throw new ApiError_1.default(401, 'User cannot view this ticket');
      }
      return ticket;
    };
    // eslint-disable-next-line class-methods-use-this
    this.all = async (userId, offset = 0, limit = 10) => {
      const confirmedUser = await user_model_1.default.findById(userId);
      if (!confirmedUser) {
        throw new ApiError_1.default(404, 'User not found');
      }
      const tickets = await ticket_model_1.default
        .find({ user: confirmedUser._id })
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: 'desc' });
      const ticketsCount = await ticket_model_1.default.count();
      return { tickets, ticketsCount };
    };
    // eslint-disable-next-line class-methods-use-this
    this.update = async (id, payload, user) => {
      const confirmUserToTicket = await ticket_model_1.default.findOne({ user: user._id });
      if (!confirmUserToTicket) {
        throw new ApiError_1.default(401, 'User cannot update this ticket');
      }
      const updatedTicket = await ticket_model_1.default.findByIdAndUpdate(id, { ...payload }, { new: true });
      return updatedTicket;
    };
    // eslint-disable-next-line class-methods-use-this
    this.delete = async (id, user) => {
      const confirmUserToTicket = await ticket_model_1.default.findOne({ user: user._id });
      if (!confirmUserToTicket) {
        throw new ApiError_1.default(401, 'User cannot delete this ticket');
      }
      const ticket = await ticket_model_1.default.findById(id);
      await ticket.remove();
      return ticket;
    };
  }
}
exports.default = TicketService;
//# sourceMappingURL=ticket.service.js.map
