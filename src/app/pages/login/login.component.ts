import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppStoreState } from 'src/app/store/app.state';
import { LoginDto } from 'src/app/models/loginDto';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrMessageService } from 'src/app/services/toastr-message.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private loginDto!: LoginDto;
  private findLogin!: User;
  private userArray!: User;
  constructor(
    private loginService: LoginService,
    private store: Store<AppStoreState>,
    private toastr: ToastrMessageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginDtoForm();
  }
  loginDtoForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    this.loginService.checkUser().subscribe({
      next: (res) => {
        const user = res.find((user: User) => {
          return (
            user.email === this.loginForm.value.email &&
            user.password === this.loginForm.value.password
          );
        });
        if (user) {
          console.log('User: ', user);
          this.toastr.success('Login Success', 'Login');
          this.loginForm.reset();
          this.router.navigateByUrl('home');
        } else {
          this.toastr.error('Login Failed', 'Login');
        }
      },
      error: (err) => {
        this.toastr.error('Something went wrong', 'Error');
      },
    });
  }

  registerPage() {
    this.router.navigateByUrl('signup');
  }
}
