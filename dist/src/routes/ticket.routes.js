'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const ticket_controller_1 = __importDefault(require('../controllers/ticket.controller'));
const auth_1 = __importDefault(require('../middlewares/auth'));
const validate_1 = __importDefault(require('../middlewares/validate'));
const ticket_validation_1 = __importDefault(require('../validations/ticket.validation'));
const router = (0, express_1.Router)();
router
  .route('/')
  .get(auth_1.default, ticket_controller_1.default.getTickets)
  .post(
    auth_1.default,
    (0, validate_1.default)(ticket_validation_1.default.createTicket),
    ticket_controller_1.default.createTicket
  );
router
  .route('/:id')
  .get(auth_1.default, ticket_controller_1.default.getSingleTicket)
  .put(
    auth_1.default,
    (0, validate_1.default)(ticket_validation_1.default.updateTicket),
    ticket_controller_1.default.updateTicket
  )
  .delete(auth_1.default, ticket_controller_1.default.deleteTicket);
exports.default = router;
//# sourceMappingURL=ticket.routes.js.map
