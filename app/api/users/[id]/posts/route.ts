import userController from "@controllers";

export const GET = async (req, { params }): Promise<Response> => {
  const { status, response } = await userController.userController().getUserPosts(params.id);

  return new Response(JSON.stringify(response), { status });
}
