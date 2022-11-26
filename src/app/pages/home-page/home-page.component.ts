import { Component, OnInit } from '@angular/core';

import { AppStoreState } from 'src/app/store/app.state';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { LoadingService } from 'src/app/services/loading.service';
import { LoginDto } from 'src/app/models/loginDto';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrMessageService } from 'src/app/services/toastr-message.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  books!: Book[];
  isLoading!: boolean;
  bookModel$: Observable<Book | null>;
  loginDto$: Observable<LoginDto | null>;
  loginDto!: LoginDto;
  publisher: string = '';
  isbn: string = '';
  bookName: string = '';
  author: string = '';
  constructor(
    private booksService: BooksService,
    private loadingService: LoadingService,
    private toaster: ToastrMessageService,
    private router: Router,
    private store: Store<AppStoreState>
  ) {
    this.bookModel$ = this.store.select((state) => state.book.bookModel);
    this.loginDto$ = this.store.select((state) => state.auth.loginDtoModel);
  }

  ngOnInit(): void {
    this.isPageLoading();
    this.loading();
    this.getBooks();
    this.loginDto$.subscribe((res) => {
      if (res != null) this.loginDto = res;
    });
  }

  //Todo  Kitapları Api çektiğimiz fonksiyon
  getBooks() {
    setTimeout(() => {
      //Todo book servicelerde getBook  oluşturduğumuz method ile  kitap verilerini subscribe olarak ulaşıyoruz.
      this.booksService.getBook().subscribe({
        next: (response) => {
          //Todo HTTP request'den gelen response oluşturduğumuz değişkene atıyoruz.
          this.books = response;
          console.log(response);
        },
      });
    }, 500);
  }

  editPage(book: Book) {
    this.booksService.saveBookEdit(book);
    this.router.navigateByUrl('editBook');
  }

  deleteBook(id: number) {
    //Todo Eğer confirm methodundan gelen boolean değer true ise silme işlemine başlanır.
    if (confirm(`ID of the book you want to delete: ${id}`) == true) {
      //Todo bookService oluşturudupumuz delete methoduna subscribe olarak işlemi yapılır
      this.booksService.delete(id).subscribe({
        next: (response) => {
          console.log('Deleted Book', response);
        },
        error: (error) => {
          console.log('An unexpected error was encountered.', error.message);
        },
        complete: () => {
          this.toaster.success(
            'The requested book has been deleted successfully.',
            'Delete Book Success'
          );
          this.getBooks();
        },
      });
    } else {
      this.toaster.info('The deletion has been cancelled.', 'Delete Book Info');
    }
  }

  isPageLoading() {
    this.loadingService.isLoadingBehavior.subscribe((loading) => {
      console.log('HomePage', loading);
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
