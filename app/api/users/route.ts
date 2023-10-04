import User from "@models/user";
import { checkCredentials } from "@utils/checkCredentials";

export const GET = async (req, res): Promise<Response> => {
  try {
    const users = await User.find({}).populate("role_id");

    if (!users) {
      return new Response(JSON.stringify({ message: "Users not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch all users ${JSON.stringify(error.message)}`, { status: 500 });
  }
}
