import { connectToDB } from "@utils/database";
import User from "@models/user";
import Role from "@models/role";
import {getSession} from "next-auth/react";
import {useUserRole} from "@middleware/useUserRole";
import {useSession} from "next-auth/react";
import isAdmin from "@middleware/api/isAdmin";

export const GET = async (req, res) => {
  try {
    // await isAdmin(req, res);

    await connectToDB();

    await isAdmin(req, res);

    const session = await getSession({ req });
    console.log(session);
    console.log(JSON.stringify(req));


    /*const session = await getSession({ req });

    console.log(session);*/

    // const { data: session } = useSession();

    /*const session = await getSession({ req });

    console.log(req, "req")
    console.log(session, "session");

    if (!session) {
      return new Response(JSON.stringify({ message: "User not authenticated" }), { status: 401 });
    }*/

    /*const userRole = useUserRole(["admin", "user"]);

    if (!userRole) {
      return new Response(JSON.stringify({ message: "Permission denied" }), { status: 403 });
    }*/

    const users = await User.find({}).populate("role_id");

    if (!users) {
      return new Response(JSON.stringify({ message: "Users not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch all users ${JSON.stringify(error.message)}`, { status: 500 });
  }
}
