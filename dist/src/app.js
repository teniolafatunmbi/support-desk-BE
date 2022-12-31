'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importStar(require('express'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const helmet_1 = __importDefault(require('helmet'));
const morgan_1 = __importDefault(require('morgan'));
const cors_1 = __importDefault(require('cors'));
const dotenv_1 = __importDefault(require('dotenv'));
const index_routes_1 = __importDefault(require('./routes/index.routes'));
const error_1 = __importDefault(require('./middlewares/error'));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, cookie_parser_1.default)());
if (process.env.NODE_ENV === 'production') {
  app.use((0, cors_1.default)({ origin: ['*'] }));
} else {
  const whitelist = [
    'http://localhost:5173',
    'https://support-desk-tau.vercel.app',
    'https://support-desk-tau.vercel.app/',
    'https://support-desk-devteni.vercel.app',
    'https://support-desk-devteni.vercel.app/',
    'https://support-desk-git-main-devteni.vercel.app',
    'https://support-desk-git-main-devteni.vercel.app/',
  ];
  const corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  app.use(
    (0, cors_1.default)({
      ...corsOptions,
      credentials: true,
      allowedHeaders: ['access-control-allow-credentials', 'authorization', 'content-type', 'access-control-allow-origin'],
    })
  );
}
app.use((0, express_1.json)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use('/api/', index_routes_1.default);
app.use(error_1.default);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' });
});
app.get('*', (req, res) => {
  res.status(200).json({ message: 'Route not found' });
});
exports.default = app;
//# sourceMappingURL=app.js.map
