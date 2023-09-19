import { Session } from "next-auth/react";

declare module "next-auth/react" {
  interface Session {
    data: {
      user: {
        id: string;
        role: string;
        name: string;
        email: string;
        image: string;
      };
      token: string;
    }
  }
}
