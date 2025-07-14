// src/types/auth.ts
export interface Credentials {
  email?: string;
  password?: string;
}

export interface JWTParams {
  token: unknown;
  user?: unknown;
}

export interface SessionParams {
  session: unknown;
  token: unknown;
}