import createHttpError from "http-errors";
import { Note } from '../models/note.js';
import { TAGS } from "../constants/tags.js";

export const getAllNotes = async (req, res) => {
  const { tag, search } = req.query;

  const query = Note.find();

  if (tag) {
    query.where("tag").equals(tag);
  }

  if (search) {
    query.where({ $text: { $search: search } });
  }

  const notes = await query;

  res.status(200).json({ notes });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  };

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({ _id: noteId });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  };

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate(
    { _id: noteId },
    req.body,
    { returnDocument: "after" },
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  };

  res.status(200).json(note);
};
