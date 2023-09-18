import { connectToDB } from "@utils/database";
import User from "@models/user";
import Role from "@models/role";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { getAvailableRoles } from "@static/getAvailableRoles";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const headersInstance = headers()
    const authorization = headersInstance.get('authorization')

    const token = authorization.split(" ")[1];

    if (!token) {
      return new Response(JSON.stringify({ message: "User is not authenticated" }), { status: 401 });
    }

    const { role: userRole } = jwt.verify(token, process.env.JWT_SECRET);

    const permittedRoles = getAvailableRoles("getUsers");

    const hasPermission = permittedRoles.includes(userRole);

    if (!hasPermission) {
      return new Response(JSON.stringify({ message: "Permission denied" }), { status: 403 });
    }

    const users = await User.find({}).populate("role_id");

    if (!users) {
      return new Response(JSON.stringify({ message: "Users not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch all users ${JSON.stringify(error.message)}`, { status: 500 });
  }
}
