import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppStoreState } from 'src/app/store/app.state';
import { LoginDto } from 'src/app/models/loginDto';
import { LoginService } from 'src/app/services/login.service';
import { Store } from '@ngrx/store';
import { ToastrMessageService } from 'src/app/services/toastr-message.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  loginForm!: FormGroup;
  private loginDto!: LoginDto;
  private findLogin!: User;
  private userArray!: User;
  constructor(
    private loginService: LoginService,
    private store: Store<AppStoreState>,
    private toastr: ToastrMessageService,
    private formBuilder: FormBuilder
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

  login() {}
}
