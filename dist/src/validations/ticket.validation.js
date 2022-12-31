'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const joi_1 = __importDefault(require('joi'));
const createTicket = joi_1.default.object().keys({
  product: joi_1.default.string().required(),
  description: joi_1.default.string().required(),
});
const updateTicket = joi_1.default.object().keys({
  product: joi_1.default.string().optional(),
  description: joi_1.default.string().optional(),
  status: joi_1.default.string().optional(),
});
const ticketSchema = { createTicket, updateTicket };
exports.default = ticketSchema;
//# sourceMappingURL=ticket.validation.js.map
