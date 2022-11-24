import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppStoreState } from 'src/app/store/app.state';
import { Book } from 'src/app/models/book';
import { BookCategory } from 'src/app/models/book-category';
import { BookCategoryService } from 'src/app/services/book-category.service';
import { BooksService } from 'src/app/services/books.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrMessageService } from 'src/app/services/toastr-message.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  bookCategories!: BookCategory[];
  bookModel$: Observable<Book | null>;
  editBook!: FormGroup;
  book!: Book | null;
  selected!: number;
  updateOrAdd: boolean = false;
  title: string = 'Add Book';
  constructor(
    private bookCategoryService: BookCategoryService,
    private store: Store<AppStoreState>,
    private formBuilder: FormBuilder,
    private bookService: BooksService,
    private toastr: ToastrMessageService,
    private router: Router
  ) {
    this.bookModel$ = this.store.select((state) => state.book.bookModel);
  }

  ngOnInit(): void {
    this.getBookCategories();
    this.bookModel$.subscribe((response) => {
      if (response != null) this.book = response;
      this.editBookForm();
    });
  }

  selectChangeHandler(event: any) {
    this.selected = event.target.value;
  }

  editBookForm() {
    this.editBook = this.formBuilder.group({
      id: [this.book?.id ?? null],
      isbn: [
        this.book?.isbn ?? null,
        [Validators.required, Validators.minLength(13)],
      ],
      name: [this.book?.name ?? '', Validators.required],
      author: [this.book?.author ?? '', Validators.required],
      categoryId: [this.book?.categoryId ?? this.selected, Validators.required],
      publisher: [this.book?.publisher ?? '', Validators.required],
    });
  }

  onSubmit() {
    if (true) {
      this.title = 'Book Update';
      this.bookUpdate();
    } else {
      this.title = 'Book Add';
      this.bookAdd();
    }
  }
  bookAdd() {}

  bookUpdate() {
    this.bookService.update(this.editBook.value).subscribe({
      next: (response) => {
        console.log('Update Book:', response);
      },
      error: (error) => {
        console.log('Error:', error.message);
      },
      complete: () => {
        this.toastr.success(
          'This book has been updated',
          'Book Update Success'
        );
        this.router.navigateByUrl('home');
      },
    });
    console.log('Book Update', this.editBook.value);
  }

  getBookCategories() {
    this.bookCategoryService.getBookCategory().subscribe((response) => {
      this.bookCategories = response;
      console.log('Book Category: ', response);
    });
  }
}
