import { Role } from '../enums';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
}
