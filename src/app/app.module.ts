import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreState } from './store/app.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { appReducers } from './store/app.reducer';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { BorrowBookComponent } from './pages/borrow-book/borrow-book.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomePageComponent,
    LoadingComponent,
    EditBookComponent,
    AddBookComponent,
    SignUpComponent,
    BorrowBookComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),

    StoreModule.forRoot<AppStoreState>(appReducers),

    StoreDevtoolsModule.instrument({
      autoPause: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
