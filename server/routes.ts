import * as express from 'express';

import UserCtrl from './controllers/user';
import BookCtrl from './controllers/bookDetail';
import CategoryCtrl from './controllers/category';


export default function setRoutes(app) {
  const router = express.Router();
  const userCtrl = new UserCtrl();
  const bookDetail = new BookCtrl();
  const categoryCtrl = new CategoryCtrl();

  // Login
  router.route('/login').post(userCtrl.login);

  // Books
  router.route('/newBookEntry').post(bookDetail.insert);
  router.route('/getBookEntry').post(bookDetail.getAll);
  router.route('/books').get(bookDetail.getAll);
  router.route('/books/count').get(bookDetail.count);
  router.route('/book').post(bookDetail.insert);
  router.route('/book/:id').get(bookDetail.get);
  router.route('/book/:id').put(bookDetail.update);
  router.route('/book/:id').delete(bookDetail.delete);

  // Category
  router.route('/newCategory').post(categoryCtrl.insert);
  router.route('/categories').get(categoryCtrl.getAll);
  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
