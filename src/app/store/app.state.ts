import { AuthStoreState } from './auth/auth.state';
import { BookStoreState } from './book/book.state';

export interface AppStoreState {
  book: BookStoreState;
  auth: AuthStoreState;
}
