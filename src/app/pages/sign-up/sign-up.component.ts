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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
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
    this.registerUserForm();
  }

  registerUserForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  register() {
    const user: User = {
      id: 0,
      name: `'${this.registerForm.value.firstName} ${this.registerForm.value.lastName}'`,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: 'user',
    };
    this.loginService.register(user).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.toastr.success('Registration successful', 'Registration');
        this.router.navigateByUrl('login');
      },
    });
  }
}
