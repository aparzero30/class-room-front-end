import { Role } from '../interfaces/Role';

export interface User {
  userId: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}
