import userController from "@controllers";

export const GET = async (req, { params }): Promise<Response> => {
  const { status, response } = await userController.userController().getUser(params.id);

  return new Response(JSON.stringify(response), { status });
}

export const PATCH = async (req, { params }): Promise<Response> => {
  const { role_id } = await req.json();
  const { status, response } = await userController.userController().updateUser(params.id, { role_id });

  return new Response(JSON.stringify(response), { status });
}

export const DELETE =  async (req, { params }): Promise<Response> => {
  const { status, response } = await userController.userController().deleteUser(params.id);

  return new Response(JSON.stringify(response), { status });
}
