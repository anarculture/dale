// types/express/index.d.ts

import "express";

declare module "express" {
  interface SessionData {
    user?: { id: string; email: string };
  }

  interface Request {
    session: SessionData;
  }
}
