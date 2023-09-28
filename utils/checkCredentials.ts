import { connectToDB } from "@utils/database";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { IUser } from "@ts/interface/user";
import { getAvailableRoles } from "@static/getAvailableRoles";

export const checkCredentials = async (action: string): Promise<void | Response> => {
  try {
    await connectToDB();

    const headersInstance = headers();
    const authorization = headersInstance.get('authorization');

    const token = authorization.split(" ")[1];

    if (!token) {
      return new Response(JSON.stringify({ message: "User is not authenticated" }), { status: 401 });
    }

    const { role: userRole } = jwt.verify(token, process.env.JWT_SECRET) as IUser;

    const permittedRoles = getAvailableRoles(action);

    const hasPermission = permittedRoles.includes(userRole);

    if (!hasPermission) {
      return new Response(JSON.stringify({ message: "Permission denied" }), { status: 403 });
    }
  } catch (error) {
    return new Response(`Internal server error ${JSON.stringify(error)}`, { status: 500 });
  }
}
