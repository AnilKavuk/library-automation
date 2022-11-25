import { RouterModule, Routes } from '@angular/router';

import { AddBookComponent } from './pages/add-book/add-book.component';
import { BorrowBookComponent } from './pages/borrow-book/borrow-book.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { RoleGuard } from './guards/role.guard';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomePageComponent, canActivate: [LoginGuard] },
  {
    path: 'borrowBook',
    component: BorrowBookComponent,
    canActivate: [LoginGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'editBook',
    component: EditBookComponent,
    canActivate: [LoginGuard, RoleGuard],
  },
  {
    path: 'addBook',
    component: AddBookComponent,
    canActivate: [LoginGuard, RoleGuard],
  },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
