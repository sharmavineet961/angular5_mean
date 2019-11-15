import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CreateBookEntry } from '../shared/models/BookEntry.model';
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  createBookEntry(user: CreateBookEntry): Observable<CreateBookEntry> {
    return this.http.post<CreateBookEntry>('/api/newBookEntry', user);
  }

  login(credentials): Observable<any> {
    return this.http.post<any>('/api/login', credentials);
  }
}
