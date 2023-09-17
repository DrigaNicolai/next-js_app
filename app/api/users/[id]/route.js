import { connectToDB } from "@utils/database";
import User from "@models/user";

export const DELETE =  async (req, { params }) => {
  try {
    await connectToDB();

    const user = await User.findById(params.id);

    if (!user) {
      return new Response("Prompt not found", { status: 404 });
    }

    await User.deleteOne(user);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
}
