'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const note_service_1 = __importDefault(require('../services/note.service'));
const catchAsync_1 = __importDefault(require('../utils/catchAsync'));
const paginator_1 = __importDefault(require('../utils/paginator'));
class NoteController {
  constructor() {
    this.noteService = new note_service_1.default();
    /**
     *
     * @desc Returns all ticket's notes
     * @route GET /api/notes
     *
     * @access Private
     */
    this.getTicketNotes = (0, catchAsync_1.default)(async (req, res) => {
      const { user } = req;
      const { page, size, ticket_id } = req.query;
      const userId = user._id;
      // eslint-disable-next-line camelcase
      const ticketId = ticket_id.toString();
      const pageNumber = page !== undefined ? parseInt(page.toString(), 10) : 1;
      const pageSize = size !== undefined ? parseInt(size.toString(), 10) : 10;
      const limit = pageSize < 1 || pageSize > 100 ? 10 : pageSize;
      const offset = paginator_1.default.offset(pageNumber, pageSize);
      const { notes, notesCount } = await this.noteService.all({ userId, ticketId, offset, limit });
      const pointers = paginator_1.default.pageUrls(pageNumber, limit, notesCount, `${req.baseUrl}`);
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
    this.createTicket = (0, catchAsync_1.default)(async (req, res) => {
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
}
exports.default = new NoteController();
//# sourceMappingURL=note.controller.js.map
