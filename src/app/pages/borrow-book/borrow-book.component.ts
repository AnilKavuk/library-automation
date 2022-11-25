import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css'],
})
export class BorrowBookComponent implements OnInit {
  Books!: Book[];
  constructor(private bookService: BooksService) {}

  ngOnInit(): void {
    this.getBook();
  }

  getBook() {
    this.bookService.getBook().subscribe((res) => {
      this.Books = res;
    });
  }
}
