import Role from "@models/role";
import { checkCredentials } from "@utils/checkCredentials";

export const GET = async (req): Promise<Response> => {
  try {
    await checkCredentials("getRoles");

    const roles = await Role.find({});

    return new Response(JSON.stringify(roles), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
