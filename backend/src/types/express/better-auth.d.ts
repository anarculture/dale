// src/types/better-auth.d.ts
import 'better-auth';

declare module 'better-auth' {
  interface AuthContext {
    claims: {
      sub: string;
      email?: string;
      name?: string;
      [key: string]: any;
    };
    token: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      auth?: import('better-auth').AuthContext;
    }
  }
}
