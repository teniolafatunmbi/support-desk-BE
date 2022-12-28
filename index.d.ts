export type getAllNotes = {
  userId: string;
  ticketId: string;
  offset: number;
  limit: number;
};

export type createNotePayload = {
  ticketId: string;
  text: string;
};

export type createNote = {
  userId: string;
  payload: createNotePayload;
};

export interface IRequest extends Request {
  user: Record<string, string>;
}
