import postController from "@controllers";

// GET (read)
export const GET = async (req, { params }): Promise<Response> => {
  const { status, response } = await postController.postController().getPost(params.id);

  return new Response(JSON.stringify(response), { status });
}

// PATCH (update)
export const PATCH = async (req, { params }): Promise<Response> => {
  const post = await req.json();
  const { status, response } = await postController.postController().updatePost(params.id, post);

  return new Response(JSON.stringify(response), { status });
}

// DELETE (delete)
export const DELETE =  async (req, { params }): Promise<Response> => {
  const { status, response } = await postController.postController().deletePost(params.id);

  return new Response(JSON.stringify(response), { status });
}
