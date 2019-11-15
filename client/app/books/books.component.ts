/**
 * Created by Ezimax on 07-12-2017.
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BookService } from '../services/book.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { CreateBookEntry } from '../shared/models/BookEntry.model';

@Component({
  selector: 'app-book',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  book = new CreateBookEntry();
  books: CreateBookEntry[] = [];
  isLoading = true;
  isEditing = false;
  constructor(private bookService: BookService,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      data => this.books = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
    enableEditing(book: CreateBookEntry) {
    this.isEditing = true;
    this.book = book;
  }

  cancelEditing() {
    this.isEditing = false;
    this.book = new CreateBookEntry();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the books to reset the editing
    this.getBooks();
  }

  editBook(book: CreateBookEntry) {
    this.bookService.editBook(book).subscribe(
      () => {
        this.isEditing = false;
        this.book = book;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteBook(book: CreateBookEntry) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.bookService.deleteBook(book).subscribe(
        () => {
          const pos = this.books.map(elem => elem._id).indexOf(book._id);
          this.books.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}

