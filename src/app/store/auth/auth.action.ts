import { createAction, props } from '@ngrx/store';

import { LoginDto } from 'src/app/models/loginDto';

export const setLoginDtoModel = createAction(
  '[Auth] Set Auth Model', //* Benzersiz key verdik. Bu action type/id olucak.
  props<{ loginDtoModel: LoginDto }>() //* inline bir interface yazdık.
  //* Bu interface'in içindeki property'ler, action'ın içindeki property'ler/payload olucak.
);
