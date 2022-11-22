import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  books!: Book[];
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBook().subscribe({
      next: (response) => {
        this.books = response;
        console.log(response);
      },
    });
  }
}
