import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Book } from 'src/app/models/book';
import { BookCategory } from 'src/app/models/book-category';
import { BookCategoryService } from 'src/app/services/book-category.service';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';
import { ToastrMessageService } from 'src/app/services/toastr-message.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  bookCategories!: BookCategory[];
  addBook!: FormGroup;
  book!: Book | null;
  selected!: number;

  constructor(
    private bookCategoryService: BookCategoryService,
    private formBuilder: FormBuilder,
    private bookService: BooksService,
    private toastr: ToastrMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBookCategories();
    this.AddBookForm();
  }

  selectChangeHandler(event: any) {
    this.selected = Number(event.target.value);
  }

  AddBookForm() {
    this.addBook = this.formBuilder.group({
      isbn: [null, [Validators.required, Validators.minLength(13)]],
      name: ['', Validators.required],
      author: ['', Validators.required],
      categoryId: [null ?? this.selected, Validators.required],
      publisher: ['', Validators.required],
    });
  }

  bookAdd() {
    this.bookService.post(this.addBook.value).subscribe({
      next: (response) => {
        console.log('Add Book:', response);
      },
      error: (error) => {
        console.log('Error:', error.message);
      },
      complete: () => {
        this.toastr.success('This book has been Added', 'Book Add Success');
        this.router.navigateByUrl('home');
      },
    });
    console.log('Book Add', this.addBook.value);
  }

  getBookCategories() {
    this.bookCategoryService.getBookCategory().subscribe((response) => {
      this.bookCategories = response;
      console.log('Book Category: ', response);
    });
  }
}
