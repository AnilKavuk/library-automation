import { Component, OnInit } from '@angular/core';

import { BookCategory } from 'src/app/models/book-category';
import { BookCategoryService } from 'src/app/services/book-category.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookCategories!: BookCategory[];
  constructor(private bookCategoryService:BookCategoryService) { }

  ngOnInit(): void {
    this.getBookCategories();
  }

  getBookCategories() {
    this.bookCategoryService.getBookCategory().subscribe((response) => {
      this.bookCategories = response;
      console.log('Book Category: ',response)
    })
  }

}
