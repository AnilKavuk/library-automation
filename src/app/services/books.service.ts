import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  //Todo environment içinde genel link ataması yapıldı.
  private controllerUrl = `${environment.apiUrl}/books`;
  constructor(private httpClient: HttpClient) {}

  getBook(): Observable<Book[]> {
    //Todo get metodu Get Http istediğini hazırlıyor.
    return this.httpClient.get<Book[]>(this.controllerUrl);
  }
}
