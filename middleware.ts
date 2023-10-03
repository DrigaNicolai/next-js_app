import { NextResponse } from "next/server";
import { Request } from "@node_modules/next/dist/compiled/@edge-runtime/primitives/fetch";
import { verifyJWT } from "@utils/token";
import { getAvailableRoles } from "@static/getAvailableRoles";

export async function middleware(request: Request) {
  try {
    const action = `${request.method}-${request.nextUrl.pathname}`

    const headers = request.headers;
    const authorization = headers.get("authorization");

    if (authorization) {
      const token = authorization.split(" ")[1];

      if (!token) {
        return NextResponse.json({ message: "User is not authenticated" }, { status: 401 });
      }

      const { sub } = await verifyJWT<{ sub: string }>(token);

      const userData = JSON.parse(sub);

      const permittedRoles = getAvailableRoles(action);

      const hasPermission = permittedRoles.includes(userData.role);

      if (!hasPermission) {
        return NextResponse.json({ message: "Permission denied" }, { status: 403 });
      }
    }
    /*if (request.nextUrl.pathname === "/api/users") {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }*/

    /*const origin = request.headers.get("origin");
    console.log(origin);*/

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: `Internal server error ${JSON.stringify(error)}` }, { status: 500 });
  }
}

export const config = {
  matcher: ["/api/:path*"]
}
