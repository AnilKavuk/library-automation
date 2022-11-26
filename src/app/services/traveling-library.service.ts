import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TravelingLibrary } from '../models/traveling-library';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TravelingLibraryService {
  private controllerUrl = `${environment.apiUrl}/travelingLibrary`;
  constructor(private httpClient: HttpClient) {}

  postBurrowBook(borrowBook: TravelingLibrary): Observable<TravelingLibrary> {
    return this.httpClient.post<TravelingLibrary>(
      this.controllerUrl,
      borrowBook
    );
  }

  getBurrowBook(id: number): Observable<TravelingLibrary[]> {
    return this.httpClient.get<TravelingLibrary[]>(
      `${this.controllerUrl}?userId=${id}`
    );
  }
}
