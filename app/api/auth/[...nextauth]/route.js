import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import jwt from "jsonwebtoken";

import User from "@models/user";
import Role from "@models/role";
import { connectToDB } from "@utils/database";

const secret = process.env.JWT_SECRET;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email }).populate("role_id");

      session.user.id = sessionUser._id.toString();
      session.user.role = String(sessionUser.role_id.name);

      session.token = jwt.sign(session.user, secret, { expiresIn: "24h" });

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email })

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
            role_id: undefined
          })
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  }
});

export { handler as GET, handler as POST };
