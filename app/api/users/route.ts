import userController from "@controllers/index";

export const GET = async (req, res): Promise<Response> => {
  const { status, response } = await userController.userController().getUsers();

  return new Response(JSON.stringify(response), { status });
}
