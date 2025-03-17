// /src/next.d.ts

import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      user: JwtPayload | null;
    }
  }
}

declare module 'next' {
  interface NextApiRequest {
    user?: JwtPayload; // Extend NextApiRequest to have a `user` property
  }
}
