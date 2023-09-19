import { DefaultSession } from "@node_modules/next-auth/src/core/types";

export interface ISession extends DefaultSession {
  data: {
    user: {
      id: string;
      role: string;
      name: string;
      email: string;
      image: string;
    };
  }
}
