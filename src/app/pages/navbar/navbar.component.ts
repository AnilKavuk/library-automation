import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { AppStoreState } from 'src/app/store/app.state';
import { LoginDto } from 'src/app/models/loginDto';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  loginDto$: Observable<LoginDto | null>;
  loginDto!: LoginDto;
  isRole!: boolean;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private store: Store<AppStoreState>
  ) {
    this.isLogin = this.loginService.isAuthenticated;
    this.loginDto$ = this.store.select((state) => state.auth.loginDtoModel);
  }

  ngOnInit(): void {}

  login() {
    this.isLogin = this.loginService.isAuthenticated;
    this.isLogin = this.loginService.isRole;
    this.loginDto$.subscribe((res) => {
      if (res != null) this.loginDto = res;
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }
}
