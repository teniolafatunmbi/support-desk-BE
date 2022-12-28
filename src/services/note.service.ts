import { createNote, getAllNotes } from '../..';
import Note from '../models/note.model';
import User from '../models/user.model';
import ApiError from '../utils/ApiError';

class NoteService {
  // eslint-disable-next-line class-methods-use-this
  public all = async ({ userId, ticketId, offset = 0, limit = 10 }: getAllNotes) => {
    const confirmedUser = await User.findById(userId);

    if (!confirmedUser) {
      throw new ApiError(404, 'User not found');
    }

    const notes = await Note.find({ user: confirmedUser._id, ticket: ticketId })
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: 'desc' });

    const notesCount = await Note.count();

    return { notes, notesCount };
  };

  // eslint-disable-next-line class-methods-use-this
  public create = async ({ payload, userId }: createNote) => {
    const confirmUser = await User.findById(userId);

    if (!confirmUser) {
      throw new ApiError(404, 'User not found');
    }

    const note = await Note.create({
      ...payload,
      user: userId,
      ticket: payload.ticketId,
      text: payload.text,
    });

    return note;
  };
}

export default NoteService;
