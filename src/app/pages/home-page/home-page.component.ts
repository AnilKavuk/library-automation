import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  books!: Book[];
  isLoading!: boolean;
  constructor(
    private booksService: BooksService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.isPageLoading();
    this.loading();
    this.getBooks();
  }

  getBooks() {
    setTimeout(() => {
      this.booksService.getBook().subscribe({
        next: (response) => {
          this.books = response;
          console.log(response);
        },
      });
    }, 500);
  }

  isPageLoading() {
    this.loadingService.isLoadingBehavior.subscribe((loading) => {
      console.log(loading);
      this.isLoading = loading;
    });
  }

  loading() {
    if (this.books) {
      this.loadingService.stopLoading();
    } else {
      this.loadingService.startLoading();
    }
  }
}
