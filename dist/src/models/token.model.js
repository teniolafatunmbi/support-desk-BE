'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = require('mongoose');
const utils_1 = require('../utils');
const tokenSchema = new mongoose_1.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose_1.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [utils_1.tokenTypes.REFRESH, utils_1.tokenTypes.RESET_PASSWORD, utils_1.tokenTypes.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Token = (0, mongoose_1.model)('Token', tokenSchema);
exports.default = Token;
//# sourceMappingURL=token.model.js.map
