import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../models/loginDto';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private controllerUrl = `${environment.apiUrl}/users`;
  constructor(private httpClient: HttpClient) {}

  checkUser() {
    return this.httpClient.get<any>(this.controllerUrl);
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.controllerUrl, user);
  }
}
