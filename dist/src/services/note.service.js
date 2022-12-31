'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const note_model_1 = __importDefault(require('../models/note.model'));
const user_model_1 = __importDefault(require('../models/user.model'));
const ApiError_1 = __importDefault(require('../utils/ApiError'));
class NoteService {
  constructor() {
    // eslint-disable-next-line class-methods-use-this
    this.all = async ({ userId, ticketId, offset = 0, limit = 10 }) => {
      const confirmedUser = await user_model_1.default.findById(userId);
      if (!confirmedUser) {
        throw new ApiError_1.default(404, 'User not found');
      }
      const notes = await note_model_1.default
        .find({ user: confirmedUser._id, ticket: ticketId })
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: 'desc' });
      const notesCount = await note_model_1.default.count();
      return { notes, notesCount };
    };
    // eslint-disable-next-line class-methods-use-this
    this.create = async ({ payload, userId }) => {
      const confirmUser = await user_model_1.default.findById(userId);
      if (!confirmUser) {
        throw new ApiError_1.default(404, 'User not found');
      }
      const note = await note_model_1.default.create({
        ...payload,
        user: userId,
        ticket: payload.ticketId,
        text: payload.text,
      });
      return note;
    };
  }
}
exports.default = NoteService;
//# sourceMappingURL=note.service.js.map
