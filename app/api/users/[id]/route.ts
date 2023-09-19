import { connectToDB } from "@utils/database";
import User from "@models/user";
import Role from "@models/role";

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

export const DELETE =  async (req, { params }): Promise<Response> => {
  try {
    await connectToDB();

    const user = await User.findById(params.id);

    if (!user) {
      return new Response("Prompt not found", { status: 404 });
    }

    // @ts-ignore
    await User.deleteOne(user);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
}
