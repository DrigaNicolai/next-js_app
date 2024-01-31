import postController from "@controllers/index";

export const POST = async (req, res): Promise<Response> => {
  const post = await req.json();
  const { status, response } = await postController.postController().create(post);

  return new Response(JSON.stringify(response), { status });
}
