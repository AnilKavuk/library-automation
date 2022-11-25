import { AuthStoreState, initialAuthStoreState } from './auth.state';
import { createReducer, on } from '@ngrx/store';

import { setLoginDtoModel } from './auth.action';

export const authReducer = createReducer<AuthStoreState>(
  initialAuthStoreState,
  on(setLoginDtoModel, (currentState, action) => {
    return {
      ...currentState,
      loginDtoModel: action.loginDtoModel,
    };
  })
);
