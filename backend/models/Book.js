// /models/Book.js

import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  description: { type: String },
  coverImage: { type: String },
  availableCopies: { type: Number, default: 1 },
  totalCopies: { type: Number, default: 1 },
});

export default mongoose.model('Book', BookSchema);
