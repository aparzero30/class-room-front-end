import { Role } from '../interfaces/Role';

export interface RegisterRequest {
  userId: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}
