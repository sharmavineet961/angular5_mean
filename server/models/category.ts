/**
 * Created by Ezimax on 08-12-2017.
 */

import * as mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
  name: String,
});

const category = mongoose.model('Category', categorySchema);
export default category;
