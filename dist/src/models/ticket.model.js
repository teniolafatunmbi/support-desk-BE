'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = require('mongoose');
const ticketSchema = new mongoose_1.Schema(
  {
    user: {
      type: mongoose_1.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: String,
      required: [true, 'Select a product'],
      enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'],
    },
    description: {
      type: String,
      required: [true, 'Ticket description is required'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);
const Ticket = (0, mongoose_1.model)('Ticket', ticketSchema);
exports.default = Ticket;
//# sourceMappingURL=ticket.model.js.map
