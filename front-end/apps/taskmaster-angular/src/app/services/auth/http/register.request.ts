import { Role } from '../../../enums';

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
}
