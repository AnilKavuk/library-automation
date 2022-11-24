import { BookCategory } from '../models/book-category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookCategoryService {
  private controllerUrl = `${environment.apiUrl}/bookCategory`;
  constructor(private httpClient: HttpClient) {}

  bookCategory!: BookCategory[];

  getBookCategory(): Observable<BookCategory[]> {
    return this.httpClient.get<BookCategory[]>(this.controllerUrl);
  }
}
