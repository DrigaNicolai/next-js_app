import { connectToDB } from "@utils/database";
import User from "@models/user";
import Role from "@models/role";
import { checkCredentials } from "@utils/checkCredentials";

export const GET = async (req, { params }): Promise<Response> => {
  try {
    await connectToDB();

    const user = await User.findById(params.id).populate("role_id");

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch user: ${error.message}`, { status: 500 });
  }
}

export const PATCH = async (req, { params }): Promise<Response> => {
  const { role_id } = await req.json();

  try {
    await checkCredentials("updateUser");

    const existingUser = await User.findById(params.id);

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    await User.updateOne({ _id: params.id }, { role_id });

    return new Response(JSON.stringify({ message: "User successfully edited" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: `Error updating user, ${error}` }), { status: 400 });
  }
}

export const DELETE =  async (req, { params }): Promise<Response> => {
  try {
    await checkCredentials("deleteUser");

    const user = await User.findById(params.id);


    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // @ts-ignore
    await User.deleteOne(user);

    return new Response(JSON.stringify({ message: "User deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response("Error Deleting User", { status: 500 });
  }
}
