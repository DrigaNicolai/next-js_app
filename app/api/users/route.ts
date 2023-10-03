import User from "@models/user";
import { checkCredentials } from "@utils/checkCredentials";
import { getUsers } from "@services/UserService";
import userController from "@controllers/index";

export const GET = async (req, res): Promise<Response> => {
  try {
    await checkCredentials("getUsers");

    const { status, response } = await userController.userController().getUsers();

    // const { data, status } = await getUsers();

    /*if (!users) {
      return new Response(JSON.stringify({ message: "Users not found" }), { status: 404 });
    }*/

    return new Response(JSON.stringify(response), { status });
  } catch (error) {
    return new Response(`Failed to fetch all users ${JSON.stringify(error.message)}`, { status: 500 });
  }
}
