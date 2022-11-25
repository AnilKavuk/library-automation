import { LoginDto } from 'src/app/models/loginDto';

export interface AuthStoreState {
  loginDtoModel: LoginDto | null;
}

export const initialAuthStoreState: AuthStoreState = {
  loginDtoModel: null,
};
