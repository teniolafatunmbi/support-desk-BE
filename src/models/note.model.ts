import { model, Schema, SchemaDefinitionProperty, SchemaTypes } from 'mongoose';

export interface INote {
  user: SchemaDefinitionProperty;
  ticket: SchemaDefinitionProperty;
  text: string;
  isStaff: boolean;
  staffId: string;
}

const noteSchema = new Schema<INote>(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    ticket: {
      type: SchemaTypes.ObjectId,
      ref: 'Ticket',
      required: [true, 'Select a ticket'],
    },
    text: {
      type: String,
      required: [true, 'Add some text is required'],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Note = model<INote>('Note', noteSchema);

export default Note;
