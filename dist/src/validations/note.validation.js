'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const joi_1 = __importDefault(require('joi'));
const createNote = joi_1.default.object().keys({
  ticketId: joi_1.default.string().required(),
  text: joi_1.default.string().required(),
});
const noteSchema = { createNote };
exports.default = noteSchema;
//# sourceMappingURL=note.validation.js.map
