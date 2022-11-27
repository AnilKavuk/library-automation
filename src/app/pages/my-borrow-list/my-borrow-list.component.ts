import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AppStoreState } from 'src/app/store/app.state';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { LoginDto } from 'src/app/models/loginDto';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TravelingLibrary } from 'src/app/models/traveling-library';
import { TravelingLibraryService } from 'src/app/services/traveling-library.service';
import { initialAuthStoreState } from 'src/app/store/auth/auth.state';

@Component({
  selector: 'app-my-borrow-list',
  templateUrl: './my-borrow-list.component.html',
  styleUrls: ['./my-borrow-list.component.css'],
})
export class MyBorrowListComponent implements OnInit {
  loginDto$: Observable<LoginDto | null>;
  loginDto!: LoginDto;
  travelingLibraries!: TravelingLibrary[];
  books!: Book[];

  userId!: number;
  filteredBooksArray?: Book[];
  booksId!: any[];
  constructor(
    private bookService: BooksService,
    private travelingLibraryService: TravelingLibraryService,
    private store: Store<AppStoreState>,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {
    this.loginDto$ = this.store.select((state) => state.auth.loginDtoModel);
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loginDto$.subscribe((res) => {
      if (res != null) this.loginDto = res;
    });
    this.getTravelingLibraries();
    this.getBooks();
  }

  getTravelingLibraries() {
    this.travelingLibraryService.getBurrowBook(this.userId).subscribe({
      next: (res) => {
        this.travelingLibraries = res;
      },

      error: (err) => {
        console.log(err);
      },

      complete: () => {
        this.getBooks();
      },
    });
  }

  getBooks() {
    this.bookService.getBook().subscribe({
      next: (res) => {
        this.books = res;
      },

      error: (err) => {
        console.log(err);
      },

      complete: () => {
        this.booksId = this.travelingLibraries.map((book) => book.bookId);
        console.log(this.booksId);
        this.filteredBooksArray = this.books.filter((item) =>
          this.booksId.includes(item.id)
        );

        console.log(this.filteredBooksArray);
      },
    });
  }
}
