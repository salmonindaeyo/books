export type Role = 'ADMIN' | 'USER';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
}

export type UserCreateInput = Omit<User, 'id'>;
export type UserResponse = Omit<User, 'password'>; 