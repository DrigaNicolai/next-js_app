import '@styles/globals.css';

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import React from "react";
import { connectToDB } from "@utils/database";

export const metadata = {
  title: "Social Posts",
  description: "Discover & Share AI Prompts"
}

interface IRootLayout {
  children: React.ReactNode;
}

const RootLayout = ({ children }: IRootLayout) => {
  connectToDB();

  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
};

export default RootLayout;
