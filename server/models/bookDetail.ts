/**
 * Created by Ezimax on 07-12-2017.
 */

import * as mongoose from 'mongoose';
const bookSchema = new mongoose.Schema({
  id: String,
  title: String,
  shortdesc: String,
  author: String,
  description: String,
  date: Date,
  category: String,
});

const book = mongoose.model('Book', bookSchema);
export default book;
