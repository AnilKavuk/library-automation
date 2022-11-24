import { AppStoreState } from '../store/app.state';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { setBookModel } from '../store/book/book.actions';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  //Todo environment içinde genel link ataması yapıldı.
  private controllerUrl = `${environment.apiUrl}/books`;

  //Todo ngrx için değer ataması
  bookModel$: Observable<Book | null>;

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppStoreState>
  ) {
    this.bookModel$ = this.store.select((state) => state.book.bookModel);
  }

  getBook(): Observable<Book[]> {
    //Todo get metodu Get Http istediğini hazırlıyor.
    return this.httpClient.get<Book[]>(this.controllerUrl);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.controllerUrl}/${id}`);
  }

  update(book: Book) {
    return this.httpClient.put<Book>(`${this.controllerUrl}/${book.id}`, book);
  }

  saveBookEdit(bookModel: Book) {
    return this.store.dispatch(setBookModel({ bookModel }));
  }
}
