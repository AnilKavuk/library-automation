import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppStoreState } from 'src/app/store/app.state';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { LoginDto } from 'src/app/models/loginDto';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrMessageService } from 'src/app/services/toastr-message.service';
import { TravelingLibrary } from 'src/app/models/traveling-library';
import { TravelingLibraryService } from 'src/app/services/traveling-library.service';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css'],
})
export class BorrowBookComponent implements OnInit {
  Books!: Book[];
  selectedBooks: Number[] = [];
  borrowBooks!: FormGroup;
  loginDto$: Observable<LoginDto | null>;
  loginDto!: LoginDto;
  bookName: string = '';
  constructor(
    private bookService: BooksService,
    private store: Store<AppStoreState>,
    private toastr: ToastrMessageService,
    private travelingLibraryService: TravelingLibraryService,
    private router: Router
  ) {
    this.loginDto$ = this.store.select((state) => state.auth.loginDtoModel);
  }

  ngOnInit(): void {
    this.getBook();
    this.loginDto$.subscribe((res) => {
      if (res !== null) this.loginDto = res;
    });
  }

  getBook() {
    this.bookService.getBook().subscribe((res) => {
      this.Books = res;
    });
  }

  selectChangeHandler(event: any) {
    if (event.target.checked) {
      this.selectedBooks.push(Number(event.target.value));
      console.log('Selected Book', this.selectedBooks);
    } else {
      const index = this.selectedBooks.findIndex(
        (x) => x === event.target.value
      );
      this.selectedBooks.splice(index, 1);
      console.log(this.selectedBooks);
    }
  }

  borrowBook() {
    this.selectedBooks.map((x) => {
      const borrowBook: TravelingLibrary = {
        id: 0,
        userId: this.loginDto.id,
        bookId: Number(x),
        dateStarted: '2022-11-26',
      };

      this.travelingLibraryService.postBurrowBook(borrowBook).subscribe({
        next: (res) => {
          console.log('Traveling Library: ', res);
        },
        error: (err) => {
          console.log('Error: ', err);
        },
        complete: () => {
          this.toastr.success(
            'you have successfully borrowed a book or books',
            'Succes Burrow a Book'
          );

          this.router.navigateByUrl('home');
        },
      });
    });
  }
}
