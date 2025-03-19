export interface LoginResponse {
    token: string;
    user: User;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: UserRole;
}

export interface LoginBody {
    email: string;
    password: string;
}

export type UserRole = 'USER' | 'ADMIN'; 
