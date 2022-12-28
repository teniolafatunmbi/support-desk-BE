import { model, Schema, SchemaDefinitionProperty, SchemaTypes } from 'mongoose';
import { tokenTypes } from '../utils';

interface IToken {
  token: string;
  blacklisted: boolean;
  type: string;
  expires: Date;
  user?: SchemaDefinitionProperty;
}

const tokenSchema = new Schema<IToken>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
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

const Token = model<IToken>('Token', tokenSchema);

export default Token;
