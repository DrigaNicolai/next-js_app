import { getEnvVariable } from "@utils/getEnvVar";
import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";

export const signJWT = async (payload: { sub: string }, options: { exp: string }): Promise<string | any> => {
  try {
    const secret = new TextEncoder().encode(getEnvVariable("JWT_SECRET_KEY"));
    const alg = "HS256";

    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options.exp)
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret);
  } catch (error) {
    return NextResponse.json({ message: `Error signing JWT: ${error}` }, { status: 500 });
  }
}

export const verifyJWT = async <T>(token: string): Promise<T | any> => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      )
    ).payload as T;
  } catch (error) {
    return NextResponse.json({ message: `Error with verifying JWT: ${error}` }, { status: 500 });
  }
}
