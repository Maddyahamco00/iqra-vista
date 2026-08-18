export type UserRole = 'student' | 'parent';

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
}

export interface RegisterResponse {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}
