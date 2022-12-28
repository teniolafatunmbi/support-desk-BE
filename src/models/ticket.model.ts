import { model, Schema, SchemaDefinitionProperty, SchemaTypes } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ITicket {
  user: SchemaDefinitionProperty;
  product: string;
  description: string;
  status: string;
}

const ticketSchema = new Schema<ITicket>(
  {
    user: {
      type: SchemaTypes.ObjectId,
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

const Ticket = model<ITicket>('Ticket', ticketSchema);

export default Ticket;
