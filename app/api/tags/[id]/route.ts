import tagController from "@controllers";

export const GET = async (req, { params }): Promise<Response> => {
  const { status, response } = await tagController.tagController().getTag(params.id);

  return new Response(JSON.stringify(response), { status });
}

export const PATCH = async (req, { params }): Promise<Response> => {
  const tag = await req.json();
  const { status, response } = await tagController.tagController().updateTag(params.id, tag);

  return new Response(JSON.stringify(response), { status });
}

export const DELETE = async (req, { params }): Promise<Response> => {
  const { status, response } = await tagController.tagController().deleteTag(params.id);

  return new Response(JSON.stringify(response), { status });

}