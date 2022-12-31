'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const auth_routes_1 = __importDefault(require('./auth.routes'));
const user_routes_1 = __importDefault(require('./user.routes'));
const ticket_routes_1 = __importDefault(require('./ticket.routes'));
const note_routes_1 = __importDefault(require('./note.routes'));
const router = (0, express_1.Router)();
const ROUTES = [
  {
    path: '/auth',
    route: auth_routes_1.default,
  },
  {
    path: '/users',
    route: user_routes_1.default,
  },
  {
    path: '/tickets',
    route: ticket_routes_1.default,
  },
  {
    path: '/notes',
    route: note_routes_1.default,
  },
];
ROUTES.forEach((route) => {
  router.use(route.path, route.route);
});
exports.default = router;
//# sourceMappingURL=index.routes.js.map
