"use client";

import {SessionProvider} from "next-auth/react";
import React from "react";
import CustomSession from "@ts/interface/customAuth";

interface IProvider {
  children: React.ReactNode;
  session?: CustomSession | any;
}

const Provider = ({ children, session }: IProvider) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default Provider;
