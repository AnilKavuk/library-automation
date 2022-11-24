import { createAction, props } from '@ngrx/store';

import { Book } from 'src/app/models/book';

export const setBookModel = createAction(
  '[Book] Set Book Model', //* Benzersiz key verdik. Bu action type/id olucak.
  props<{ bookModel: Book }>() //* inline bir interface yazdık.
  //* Bu interface'in içindeki property'ler, action'ın içindeki property'ler/payload olucak.
);
