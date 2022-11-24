import { BookStoreState, initialBookStoreState } from './book.state';
import { createReducer, on } from '@ngrx/store';

import { setBookModel } from './book.actions';

export const bookReducer = createReducer<BookStoreState>(
  initialBookStoreState,
  on(setBookModel, (currentState, action) => {
    return {
      ...currentState,
      bookModel: action.bookModel,
    };
  })
);
