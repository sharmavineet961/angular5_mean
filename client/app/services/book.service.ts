/**
 * Created by Ezimax on 07-12-2017.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CreateBookEntry } from '../shared/models/BookEntry.model';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<CreateBookEntry[]> {
    return this.http.get<CreateBookEntry[]>('/api/books');
  }

  countBooks(): Observable<number> {
    return this.http.get<number>('/api/books/count');
  }

  getBook(book: CreateBookEntry): Observable<CreateBookEntry> {
    return this.http.get<CreateBookEntry>(`/api/book/${book._id}`);
  }

  editBook(book: CreateBookEntry): Observable<string> {
    return this.http.put(`/api/book/${book._id}`, book, { responseType: 'text' });
  }

  deleteBook(book: CreateBookEntry): Observable<string> {
    return this.http.delete(`/api/book/${book._id}`, { responseType: 'text' });
  }

}
