import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../models/loginDto';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private controllerUrl = `${environment.apiUrl}/users`;
  constructor(private httpClient: HttpClient) {}

  checkUser() {
    return this.httpClient.get<User>(this.controllerUrl);
  }
}
