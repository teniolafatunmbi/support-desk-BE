'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const catchAsync_1 = __importDefault(require('../utils/catchAsync'));
const ticket_service_1 = __importDefault(require('../services/ticket.service'));
const paginator_1 = __importDefault(require('../utils/paginator'));
// !TODO: Implement pagination for tickets
class TicketController {
  constructor() {
    this.ticketService = new ticket_service_1.default();
    /**
     *
     * @desc Returns all user tickets
     * @route GET /api/tickets
     *
     * @access Private
     */
    this.getTickets = (0, catchAsync_1.default)(async (req, res) => {
      const { user } = req;
      const { page, size } = req.query;
      const pageNumber = page !== undefined ? parseInt(page.toString(), 10) : 1;
      const pageSize = size !== undefined ? parseInt(size.toString(), 10) : 10;
      const limit = pageSize < 1 || pageSize > 100 ? 10 : pageSize;
      const offset = paginator_1.default.offset(pageNumber, pageSize);
      const { tickets, ticketsCount } = await this.ticketService.all(user._id, offset, limit);
      const pointers = paginator_1.default.pageUrls(pageNumber, limit, ticketsCount, `${req.baseUrl}`);
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
    this.getSingleTicket = (0, catchAsync_1.default)(async (req, res) => {
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
    this.createTicket = (0, catchAsync_1.default)(async (req, res) => {
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
    this.deleteTicket = (0, catchAsync_1.default)(async (req, res) => {
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
    this.updateTicket = (0, catchAsync_1.default)(async (req, res) => {
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
}
exports.default = new TicketController();
//# sourceMappingURL=ticket.controller.js.map
