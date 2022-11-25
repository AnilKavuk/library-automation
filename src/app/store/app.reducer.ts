import { authReducer } from './auth/auth.reducer';
import { bookReducer } from './book/book.reducer';

export const appReducers = {
  book: bookReducer,
  auth: authReducer,
};
