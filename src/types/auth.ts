// src/types/auth.ts
export interface Credentials {
  email?: string;
  password?: string;
}

export interface JWTParams {
  token: any;
  user?: any;
}

export interface SessionParams {
  session: any;
  token: any;
}