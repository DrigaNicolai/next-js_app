"use client";

import {Session, SessionProvider} from "next-auth/react";
import React from "react";

interface IProvider {
  children: React.ReactNode;
  session?: Session | any;
}

const Provider = ({ children, session }: IProvider) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default Provider;
