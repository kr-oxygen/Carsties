import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  export interface Session {
    user: {
      username: string;
    } & DefaultSession['user'];
    accessToken: string;
  }

  export interface Profile {
    username: string;
  }

  interface User {
    username: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username: string;
  }
}
