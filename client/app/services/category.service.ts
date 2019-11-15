/**
 * Created by Ezimax on 08-12-2017.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CategoryModel } from '../shared/models/category.model';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) { }

  addNewCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>('/api/newCategory', category);
  }

  getCategory(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>('/api/categories');
  }
}
