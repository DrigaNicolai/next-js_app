import { Session } from "next-auth/react";
import CustomSession from "@ts/interface/customAuth";

declare module "next-auth/react" {
  interface Session extends CustomSession {}
}

