import postController from "@controllers/index";

export const GET = async (req, res): Promise<Response> => {
  const { status, response } = await postController.postController().getAllPosts();

  return new Response(JSON.stringify(response), { status });
}
