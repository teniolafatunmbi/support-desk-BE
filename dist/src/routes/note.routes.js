'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const note_controller_1 = __importDefault(require('../controllers/note.controller'));
const auth_1 = __importDefault(require('../middlewares/auth'));
const validate_1 = __importDefault(require('../middlewares/validate'));
const note_validation_1 = __importDefault(require('../validations/note.validation'));
const router = (0, express_1.Router)();
router
  .route('/')
  .get(auth_1.default, note_controller_1.default.getTicketNotes)
  .post(
    auth_1.default,
    (0, validate_1.default)(note_validation_1.default.createNote),
    note_controller_1.default.createTicket
  );
exports.default = router;
//# sourceMappingURL=note.routes.js.map
