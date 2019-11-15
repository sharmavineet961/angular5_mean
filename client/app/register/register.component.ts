import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { CategoryService } from '../services/category.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { CreateBookEntry } from '../shared/models/BookEntry.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  categories: CreateBookEntry[] = [];
  createForm: FormGroup;
  categoryForm: FormGroup;
  id = new FormControl('', [
    Validators.required,
  ]);
  title = new FormControl('', [
    Validators.required,
  ]);
  shortdesc = new FormControl('', [
    Validators.required,
  ]);
  author = new FormControl('', [
    Validators.required
  ]);
  date = new FormControl('', [
    Validators.required
  ]);
  category = new FormControl('', [
    Validators.required
  ]);
  description = new FormControl('', [
    Validators.required
  ]);
  name = new FormControl('', [
    Validators.required
  ]);
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private userService: UserService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      id: this.id,
      title: this.title,
      shortdesc: this.shortdesc,
      author: this.author,
      date: this.date,
      category: this.category,
      description: this.description
    });
    this.categoryForm = this.formBuilder.group({
      name: this.name,
    });
    this.getCategory();
  }
  register() {
    this.userService.createBookEntry(this.createForm.value).subscribe(
      res => {
        this.createForm.reset();
        this.toast.setMessage('you successfully created!', 'success');
        this.router.navigate(['/books']);
      },
      error => this.toast.setMessage('Error in entry', 'danger')
    );
  }
  /*---------------Category Service------------*/
  getCategory() {
    this.categoryService.getCategory().subscribe(
      data => {
        this.categories = data;
      },
      error => console.log(error),
    );
  }
  addCategory() {
    this.categoryService.addNewCategory(this.categoryForm.value).subscribe(
      res => {
        if (res.hasError) {
          this.toast.setMessage(res.message, 'danger');
          return ;
        }
        this.getCategory();
        document.getElementById('btnClose').click();
        this.categoryForm.reset();
        this.toast.setMessage('you successfully added!', 'success');
      },
      error =>  this.toast.setMessage('Error in entry', 'danger')
    );
  }
}
