import { AppStoreState } from '../store/app.state';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../models/loginDto';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { setLoginDtoModel } from '../store/auth/auth.action';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private controllerUrl = `${environment.apiUrl}/users`;
  //Todo ngrx için değer ataması
  loginDtoModel$: Observable<LoginDto | null>;
  loginDtoModel!: LoginDto;
  constructor(
    private httpClient: HttpClient,
    private store: Store<AppStoreState>
  ) {
    this.loginDtoModel$ = this.store.select(
      (state) => state.auth.loginDtoModel
    );
  }

  checkUser() {
    return this.httpClient.get<any>(this.controllerUrl);
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.controllerUrl, user);
  }

  get isAuthenticated(): boolean {
    let isLogin = localStorage.getItem('isLogin');
    if (!isLogin) {
      return false;
    }

    return true;
  }

  get isRole(): boolean {
    let isRole = localStorage.getItem('isRole');
    if (isRole != 'admin') {
      return false;
    }

    return true;
  }

  logout() {
    localStorage.removeItem('isRole');
    localStorage.removeItem('isLogin');
  }

  saveLoginDto(loginDtoModel: LoginDto) {
    return this.store.dispatch(setLoginDtoModel({ loginDtoModel }));
  }
}
