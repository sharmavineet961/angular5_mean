/**
 * Created by Ezimax on 08-12-2017.
 */

import category from '../models/category';

export default class CategoryCtrl {
  model = category;
  insert = (req, res) => {
    this.model.findOne({name: req.body.Category}, (err, cat) => {
      if (cat) {
        return res.status(200).json({hasError: true, message: 'Category ' + cat.Category + ' already exist!'});
      }
      const obj = new this.model(req.body);
      obj.save((error, item) => {
        // 11000 is the code for duplicate key error
        if (err && err.code === 11000) {
          res.sendStatus(400);
        }
        if (err) {
          return console.error(error);
        }
        res.status(200).json(item);
      });
    });

  }

  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }
}
