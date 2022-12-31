'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = require('mongoose');
const noteSchema = new mongoose_1.Schema(
  {
    user: {
      type: mongoose_1.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    ticket: {
      type: mongoose_1.SchemaTypes.ObjectId,
      ref: 'Ticket',
      required: [true, 'Select a ticket'],
    },
    text: {
      type: String,
      required: [true, 'Add some text is required'],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Note = (0, mongoose_1.model)('Note', noteSchema);
exports.default = Note;
//# sourceMappingURL=note.model.js.map
