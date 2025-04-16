export enum UserRole {
  ADMIN = "ADMIN",
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: UserRole;
  mobile:string;
}

export interface LoggedInUser extends Tokens {
  user: User;
}

export interface TokensWithId extends Tokens {
  id: number;
}


